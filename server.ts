import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

await app.listen({ port: 3000 });
