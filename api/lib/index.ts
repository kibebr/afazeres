/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */

import express from 'express'
import dotenv from 'dotenv'
import { db } from './repositories/Pg'

dotenv.config()

const app = express()

app.get('/', (_, res) => {
  res.send('hello world!')
})

db.connect()
  .then(() => {
    app.listen(process.env.PORT as string, () => {
      console.log('listening on port: ', process.env.PORT)
    })
  })
  .catch((err) => {
    console.error(err)
  })
