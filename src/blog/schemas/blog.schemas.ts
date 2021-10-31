import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  body: String,
  aurthor: String,
  postDate: String,
});
