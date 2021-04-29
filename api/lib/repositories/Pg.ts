/* eslint-disable functional/no-expression-statement */

import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const db = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
})
