import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

router.get("/api/hello-world", ({ response }: { response: any }) => {
  console.log(response);
  response.body = "Hello World";
  console.log(JSON.stringify(response));
});

await app.listen({ port: 3000 });
