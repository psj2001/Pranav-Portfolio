#!/usr/bin/env bash
# Upload the built site and PHP API to pranavps.com over SSH.
# Leaves config.php and files already in api/uploads/ on the server.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${DEPLOY_HOST:-82.25.125.71}"
PORT="${DEPLOY_PORT:-65002}"
USER="${DEPLOY_USER:-u737196981}"
REMOTE="${DEPLOY_REMOTE:-domains/pranavps.com/public_html}"
KEY="${DEPLOY_SSH_KEY:-$HOME/.ssh/id_ed25519}"

if [[ ! -f "$KEY" ]]; then
  echo "SSH key not found at $KEY" >&2
  exit 1
fi

SSH=(ssh -p "$PORT" -i "$KEY" -o IdentitiesOnly=yes -o BatchMode=yes)
RSYNC_SSH="ssh -p $PORT -i $KEY -o IdentitiesOnly=yes -o BatchMode=yes"

if ! "${SSH[@]}" "$USER@$HOST" "test -d ~/$REMOTE"; then
  echo "Could not sign in, or ~/$REMOTE is missing." >&2
  echo "In hPanel → Advanced → SSH Access → Add SSH key, paste:" >&2
  echo >&2
  ssh-keygen -y -f "$KEY"
  echo >&2
  echo "Then run: npm run deploy" >&2
  exit 1
fi

cd "$ROOT"
npm run build

rsync -az \
  --exclude server.cjs \
  --exclude server.cjs.map \
  --exclude ssr \
  --exclude api \
  --exclude cgi-bin \
  --exclude .well-known \
  -e "$RSYNC_SSH" \
  "$ROOT/dist/" "$USER@$HOST:$REMOTE/"

rsync -az \
  --exclude config.php \
  --exclude uploads \
  -e "$RSYNC_SSH" \
  "$ROOT/php-api/" "$USER@$HOST:$REMOTE/api/"

echo "Uploaded site/ to ~/$REMOTE and api/ to ~/$REMOTE/api."
echo "config.php and api/uploads/ were left as they are on the server."
echo "If the database already has projects, run api/content-update.sql once in phpMyAdmin."
