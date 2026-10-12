import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import { chatSystemInstruction, profile } from "./src/data/siteContent";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));

// Lazy-initialize Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not defined");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

const SYSTEM_INSTRUCTION = chatSystemInstruction();

// Secure Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    
    // Map chatHistory into the parts structure if available, or do simple direct generation.
    // To support lightweight fast conversations, we pass the conversation context.
    const prompt = `
Context of conversation: ${JSON.stringify(chatHistory || [])}
User Question: ${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini proxy server error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

const contactWindowMs = 15 * 60 * 1000;
const contactHits = new Map<string, number[]>();

function contactLimited(ip: string) {
  const now = Date.now();
  const recent = (contactHits.get(ip) ?? []).filter((time) => now - time < contactWindowMs);
  if (recent.length >= 5) {
    contactHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  contactHits.set(ip, recent);
  return false;
}

function textField(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

app.post("/api/contact", async (req, res) => {
  const bot = textField(req.body?.["bot-field"], 200);
  if (bot) return res.json({ ok: true });

  if (contactLimited(req.ip || "unknown")) {
    return res.status(429).json({ error: "Too many messages. Try again later." });
  }

  const fullName = textField(req.body?.fullName, 100);
  const email = textField(req.body?.email, 200);
  const interest = textField(req.body?.interest, 80);
  const message = textField(req.body?.message, 4000);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!fullName || !emailOk || !interest || !message) {
    return res.status(400).json({ error: "Enter your name, a valid email, and a message." });
  }

  const pass = process.env.SMTP_PASS;
  if (!pass) {
    console.error("Contact form is missing SMTP_PASS");
    return res.status(503).json({ error: "Message was not sent." });
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || profile.email;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transport.sendMail({
      from: user,
      to: profile.email,
      replyTo: email,
      subject: `Portfolio message from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nAbout: ${interest}\n\n${message}`,
    });
    res.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error instanceof Error ? error.message : error);
    res.status(502).json({ error: "Message was not sent." });
  }
});

// Serve Vite dev server or production bundles
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        // Express owns the HTTP port; a separate HMR WebSocket (24678) causes EADDRINUSE on restart.
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false, redirect: false }));
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      const requestPath = decodeURIComponent(req.path);
      const relative = requestPath === "/" ? "index.html" : `${requestPath.replace(/^\//, "").replace(/\/$/, "")}/index.html`;
      const file = path.normalize(path.join(distPath, relative));
      if (!file.startsWith(`${distPath}${path.sep}`) && file !== path.join(distPath, "index.html")) {
        return res.status(400).end();
      }
      if (fs.existsSync(file)) return res.sendFile(file);
      const shell = path.join(distPath, "index.html");
      if (fs.existsSync(shell)) return res.sendFile(shell);
      res.status(404).sendFile(path.join(distPath, "404.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
