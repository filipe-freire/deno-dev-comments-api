import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { getAllComments, getRandomComment } from "../db/useDb.ts";

export const commentsRouter = new Router()
  .get("/comments", (ctx) => {
    ctx.response.type = "application/json";
    ctx.response.body = JSON.stringify(getAllComments, null, 4);
  })
  .get("/comment/random", (ctx) => {
    ctx.response.body = getRandomComment;
  });
