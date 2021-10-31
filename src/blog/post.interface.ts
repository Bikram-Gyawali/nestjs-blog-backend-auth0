import { Document } from 'mongoose';

export interface Post extends Document {
  readonly title: string;
  readonly desc: string;
  readonly body: string;
  readonly aurthor: string;
  readonly postDate: string;
}
