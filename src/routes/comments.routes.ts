import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getAllComments, getRandomComment } from "../db/useDb.ts";

export const commentsRouter = new Router()
  .get("/", async (ctx) => {
    const htmlPage = await Deno.readTextFile("./src/static/home.html");
    ctx.response.type = "text/html";
    ctx.response.body = htmlPage;
  })
  .get("/comments", async (ctx) => {
    ctx.response.type = "application/json";
    ctx.response.body = JSON.stringify(await getAllComments, null, 4);
  })
  .get("/comment/random", (ctx) => {
    ctx.response.body = getRandomComment;
  });
