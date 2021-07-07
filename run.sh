cd frontend
npm run-script build
cd ..
pm2 restart macro_tracker.js
