const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add_meal', (req, res) => {
  res.send('Success')
})

app.listen(port, () => {
  console.log(`Macrotracker app listening at http://localhost:${port}`)
})