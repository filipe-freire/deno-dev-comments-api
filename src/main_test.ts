import { assertArrayIncludes, assertEquals } from "jsr:@std/assert@1.0.3";
import { describe, test } from "jsr:@std/testing/bdd";
import { COMMENTS } from "./constants/comments.ts";
import { app } from "./main.ts";

describe("📃 COMMENTS", () => {
  test("GET /comments", async () => {
    const res = await app.request("/comments");

    assertEquals(res.status, 200);
    assertEquals(
      res.headers.get("content-type"),
      "application/json; charset=UTF-8",
    );
    assertEquals(await res.json(), COMMENTS);
  });

  test("GET /comments/random", async () => {
    const res = await app.request("/comments/random");

    assertEquals(res.status, 200);
    assertEquals(
      res.headers.get("content-type"),
      "application/json; charset=UTF-8",
    );
    assertArrayIncludes(COMMENTS, await res.json());
  });
});
