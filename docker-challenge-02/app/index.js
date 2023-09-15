const express = require('express')
const mysql = require('mysql2')
const { uniqueNamesGenerator, names } = require('unique-names-generator')

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
  console.log("Trying to connect to the database...")

  connection.connect((err) => {
    if (err) console.log("An error occurred while trying to connect to the database:", err)
    else console.log("Database connected successfully!")
  })

  return connection
}

app.get('/', async (_, res) => {
  const connection = await connectDatabase()

  if (connection) console.log("A connection has just been stablished.")

  connection.query("USE appdb;", (err) => {
    if (!err) console.log("Database appdb is being used.")

    connection.query(`CREATE TABLE IF NOT EXISTS people (name varchar(512));`, (err) => {
      connection.query('DESC people;', (err, results) => {
        console.log('People table desc.:', results)

        if (!err) console.log("The table 'people' is created.")
        else console.log(`[ERROR] An error occurred while trying to create the table:`, err)

        const name = uniqueNamesGenerator({ dictionaries: [names] })

        connection.query(`INSERT INTO people (name) VALUES ('${name}')`, (err) => {
          if (!err) console.log(`The name ${name} was inserted.`)
          else console.log(`[ERROR] An error occurred while trying to insert a name:`, err)

          return connection.query('SELECT name FROM people', (err, results) => {
            if (err) {
              console.log(`[ERROR] An error occurred while trying to insert a name:`, err);
              return res.status(500).send({ error: `[ERROR] An error occurred while trying to insert a name` })
            } else {
              console.log('Names were selected.', results)

              return res.send(`
                <h1>FullCycle rocks!</h1>
                <ul>
                  ${!!results.length ? results.map(result => `<li>${result.name}</li>`) : '<p>Nothing to show</p>'}
                </ul>
              `)
            }
          });
        })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
