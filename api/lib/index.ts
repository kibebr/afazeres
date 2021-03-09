import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(process.env.PORT as string, () => {
  console.log('listening on port: ', process.env.PORT)
})