@echo off
start npm run start-server
timeout /t 5
start npx electron .