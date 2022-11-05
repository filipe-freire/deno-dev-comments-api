import { MongoClient } from "https://deno.land/x/mongo@v0.29.4/mod.ts";
import { CommentSchema } from "../types/index.ts";

const client = new MongoClient();

// Connecting to local || prod database
Deno.env.get("ENV") === "production"
  ? await client.connect(
      `mongodb+srv://${Deno.env.get("DB_USERNAME")}:${Deno.env.get(
        "DB_PW"
      )}@deno-dev-comments-api-c.yxo3w.mongodb.net/${Deno.env.get(
        "DB_NAME"
      )}?authMechanism=SCRAM-SHA-1`
    )
  : await client.connect("mongodb://127.0.0.1:27017");

const db = client.database("deno-comments-api");
const commentsCollection = db.collection<CommentSchema>("comments");

// export const getAllComments = commentsCollection.find().toArray();
//! Removes _id from response
export const getAllComments = commentsCollection
  .find(
    {},
    {
      projection: { _id: 0 },
    }
  )
  .toArray();

export async function getRandomComment() {
  const randomComment = await commentsCollection
    .aggregate([{ $sample: { size: 1 } }, { $project: { _id: 0 } }])
    .toArray();

  return (
    randomComment[0] || {
      message: "Something went wrong in our server! 👀 Please try again later!",
    }
  );
}
// client.close();
