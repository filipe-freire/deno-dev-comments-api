import { ObjectId } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

// Defining Comments schema interface
export interface CommentSchema {
  _id: ObjectId;
  comment: string;
}
