import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { commentsRouter } from "./routes/comments.routes.ts";
const PORT = 8080;

const app = new Application();

app.use(
  oakCors({
    origin:
      Deno.env.get("ENV") === "production"
        ? Deno.env.get("PRODUCTION_CLIENT_URL")
        : Deno.env.get("LOCAL_CLIENT_URL"),
    optionsSuccessStatus: 200,
  })
);

app.use(commentsRouter.routes(), commentsRouter.allowedMethods());

// Catch all
app.use((ctx) => {
  ctx.response.type = "text/html";
  ctx.response.body = "Invalid endpoint";
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log("hostname:", hostname);
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}! 🚀`
  );
});
await app.listen({ port: PORT });
