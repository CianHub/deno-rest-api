import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes.ts";

const app = new Application();

// set PORT to use environmental variable
const port = Deno.env.get("PORT") || 3000;

// set routes
app.use(router.routes());

// set allowed methods on routes
app.use(router.allowedMethods());

// start the server on the specified port
await app.listen({ port: +port });
