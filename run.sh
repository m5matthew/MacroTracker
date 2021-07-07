cd frontend
npm run-script build
cd ..
pm2 restart server.js
