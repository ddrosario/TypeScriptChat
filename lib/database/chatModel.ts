import * as mongoose from 'mongoose'

const messageSchema: mongoose.Schema = new mongoose.Schema({
  user: String,
  message: String,
  room: String
})
