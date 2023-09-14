const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 3000

const connectDatabase = async () => {
  const config = {
    host: "db",
    user: "root",
    password: "pedro",
    port: 3306
  }
  const connection = mysql.createConnection(config)

  connection.connect((err) => {
    if (err) console.log("An error occurred while trying to connect to the database:", err)
    else console.log("Database connected successfully!")
  })
}

app.get('/', (req, res) => {
  res.send('<h1>Full Cycle rocks!</h1>')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log("Trying to connect to the database...")

  setTimeout(() => {
    connectDatabase()
  }, 6000)
})
