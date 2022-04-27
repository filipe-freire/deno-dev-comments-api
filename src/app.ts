import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { commentsRouter } from "./routes/comments.routes.ts";
const PORT = 8080;

const app = new Application();

app.use(commentsRouter.routes(), commentsRouter.allowedMethods());

// Catch all
app.use(async (ctx) => {
  const text = await Deno.readTextFile("./src/static/pageNotFound.html");
  ctx.response.type = "text/html";
  ctx.response.body = text;
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log("hostname:", hostname);
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ??
        "localhost"
    }:${port}! 🚀`,
  );
});
await app.listen({ port: PORT });
