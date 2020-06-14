import { Router } from "https://deno.land/x/oak/mod.ts";
import { getPeople } from "./controllers/controllers.ts";

const router = new Router();

router.get("/api/hello-world", getPeople);

export default router;
