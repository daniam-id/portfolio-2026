#!/usr/bin/env sh
# Starts the production preview in the background and logs to .taste-skill/preview.log.
cd "$(dirname "$0")/.." || exit 1
mkdir -p .taste-skill
setsid nohup ./node_modules/.bin/vite preview --port 4173 --strictPort --host 127.0.0.1 > .taste-skill/preview.log 2>&1 < /dev/null &
echo $! > .taste-skill/preview.pid
