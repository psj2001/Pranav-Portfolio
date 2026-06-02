// Utility helper to download Pranav's Resume
export const downloadResume = () => {
  const resumeContent = `PRANAV P S - FLUTTER & FULL-STACK MOBILE APP DEVELOPER
======================================================
Email: pranavputhoor91@gmail.com
Phone: +971 555130298
Location: Dubai, United Arab Emirates
Website: https://pranavps-portfolio.netlify.app/
Linkedin: https://www.linkedin.com/in/pranav-p-s/
GitHub: https://github.com/psj2001
Visa status: Own Visa

PROFESSIONAL SUMMARY
--------------------
Mobile Application Developer with 4+ years of experience building, maintaining, and deploying production-ready mobile and web applications for Android and iOS. Skilled in Flutter, React Native, Dart, REST API integration, state management, Clean Architecture, and performance optimization. Experienced in developing scalable applications with real-time features, wallet systems, push notifications, localization, and full RTL support for Arabic and English users. Strong ability to work within existing codebases, deliver features rapidly, and collaborate closely with product and backend teams. Proficient in using AI-powered development tools such as Cursor AI, Claude, ChatGPT, and GitHub Copilot for feature planning, code generation, debugging, testing, refactoring, and accelerating software delivery while maintaining high code quality.

TECHNICAL SKILLS
-----------------
* Mobile Development: Flutter, React Native, Dart, TypeScript, Cross-Platform Development
* Architecture & State Management: Clean Architecture, Feature-Based Architecture, Bloc, Cubit, Riverpod, Provider, GetX
* API & Backend Integration: NodeJS, Express, REST APIs, GraphQL, Authentication, WebSockets, Real-Time Data Synchronization
* Performance Optimization: List Virtualization, Caching, Lazy Loading, Pagination, Memory Optimization, Rendering Performance
* Localization: Arabic/English Localization, RTL Support, Internationalization (i18n)
* AI-Assisted Development: Cursor AI, Claude, ChatGPT, GitHub Copilot, Prompt Engineering, AI-Assisted Refactoring, Automated Code Generation
* CI/CD & Tools: Git, GitHub, GitHub Actions, Codemagic, Bitrise, Firebase, Android Studio, VS Code, Xcode

WORK EXPERIENCE
----------------
Senior Flutter & Full-Stack Developer | ULegendary Digital Marketing (Dubai, UAE)
Jan 2026 – Present
* Lead development and shipping of production mobile applications for Android and iOS used by real users.
* Build scalable architecture and improve existing codebase using Clean Architecture and Bloc/Cubit.
* Integrate REST APIs, authentication, payments, notifications, and real-time data experiences that feel responsive and reliable.
* Implement Arabic and English localization with full RTL support to make the user experience feel right across GCC markets.
* Optimize large lists and frequently updating data flows to keep interactions smooth on mid-range Android devices.
* Collaborate closely with backend teams building Laravel APIs to deliver features end-to-end.
* Manage CI/CD pipelines and app store deployments with fast, reliable release cycles.
* Use AI-first development workflows with Cursor, ChatGPT, Claude, GitHub Copilot, custom rules files, and sub-agents to accelerate feature delivery.
* Contribute to product experiences serving users across the Gulf region.

Full-Stack & Mobile Developer | Casakey Real Estate (Dubai, UAE)
Oct 2024 – Dec 2025
* Built and maintained production real estate mobile applications in a rapidly evolving codebase.
* Delivered features through small, reviewable commits while maintaining application quality and performance.
* Integrated REST APIs, authentication, maps, notifications, and dynamic property feeds.
* Added offline support using Hive to ensure a smooth experience on unreliable network connections.
* Improved performance through caching, optimized rendering, and efficient state management.
* Worked directly with backend teams to define and consume API endpoints.
* Managed application releases and continuous feature shipping for both Android and iOS platforms.

Flutter Developer | Globosoft Solution Pvt Ltd (Kochi, Kerala, India)
Aug 2023 – Oct 2024
* Developed 10+ production applications across multiple business domains.
* Built scalable mobile solutions using Flutter, REST APIs, and GraphQL integrations.
* Applied Clean Architecture and SOLID principles to create maintainable and extensible codebases.
* Implemented offline-first solutions using Hive and Sqflite.
* Developed multilingual mobile experiences with localization support.
* Integrated payment gateways, notifications, analytics, and third-party services.
* Focused on performance optimization to make applications feel fast and responsive.
* Collaborated with cross-functional teams to deliver production-ready features efficiently.

Flutter Developer | Luminar Technohub (Kochi, Kerala, India)
Mar 2022 – Jul 2023
* Developed mobile application features and reusable UI components using Flutter.
* Integrated REST APIs and state management solutions.
* Fixed bugs, improved performance, and maintained existing application codebases.
* Worked across the full development lifecycle from implementation to deployment.
* Contributed to delivering high-quality mobile experiences through consistent feature shipping and maintenance.

EDUCATION
---------
* Bachelor of Commerce (B.Com) - Calicut University (Aug 2019 - Aug 2022)
  - Developed strong knowledge in business, finance, accounting, and management fundamentals.
  - Built analytical and problem-solving skills that support product development and business-oriented decision making.

PROJECTS
--------
1. PropTelli – Real Estate Mobile Application
   - Developed a role-based real estate platform for property listings, agent leads, client interactions, and document handling. Implemented secure authentication, chat support, notifications, and document uploads.

2. CREOVA
   - Implemented core features including wallet system, real-time chat functionality, and Stripe payment integration for seamless transactions. Built using Flutter with Riverpod state management and Clean Architecture.

3. Choosenfly – B2B Travel Booking Application
   - Built a secure B2B travel booking application with authenticated payments and Amazon Pay integration.

4. ChooseMyFresh – B2B Commerce Application
   - Developed a scalable B2B mobile application with secure authentication and payment integration.

5. Malankara – Devotional Mobile Application
   - Built a devotional app providing prayer times, church locations, and daily prayers.

6. CRM Falcon Force
   - Developed a full-stack CRM platform for managing clients, leads, and sales workflows using React, NodeJS, Express, and MongoDB.
`;

  const blob = new Blob([resumeContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Pranav_PS_Resume.md');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
