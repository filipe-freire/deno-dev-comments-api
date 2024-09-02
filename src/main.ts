import { Hono } from "jsr:@hono/hono@4.5.10";
import { cors } from "jsr:@hono/hono@4.5.10/cors";
import { COMMENTS } from "./constants/comments.ts";

export const app = new Hono();

app.use(
  "/comments",
  cors({
    origin: "https://top-dev-comments.vercel.app",
    allowMethods: ["GET"],
  }),
);

app
  .get("/", (c) => {
    return c.html(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home | Dev Comments Api</title>
  </head>
  <body>
    <h1>Dev Comments Api</h1>

    <p>Here are the available endpoints you can call:</p>
    <ul>
      <li>
        <a href="/comments">Get all comments</a>
      </li>
      <li>
        <a href="/comments/random">Get a random comment</a>
      </li>
    </ul>
  </body>
</html>`);
  })
  .get("/comments", (c) => c.json(COMMENTS))
  .get(
    "/comments/random",
    (c) => {
      return c.json(COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
    },
  ).get("*", (c) =>
    c.html(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Oops, page not found | Dev Comments Api</title>
  </head>
  <body>
    <h1>Dev Comments Api</h1>

    <p>Oops... the page you requested doesn't seem to exist! 🙈</p>

    <p>Here are the available endpoints you can call:</p>
    <ul>
      <li>
        <a href="/comments">Get all comments</a>
      </li>
      <li>
        <a href="/comments/random">Get a random comment</a>
      </li>
    </ul>
  </body>
</html>
`));

const PORT = Number.parseInt(Deno.env.get("PORT") || "8000");
Deno.serve({
  port: PORT,
}, app.fetch);
