import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/api/hello-world", ({ response }: { response: any }) => {
  console.log(response);
  response.body = "Hello World";
});

export default router;
