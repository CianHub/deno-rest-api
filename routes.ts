import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getPeople,
  getPerson,
  addPerson,
  deletePerson,
  updatePerson,
} from "./controllers/controllers.ts";

const router = new Router();

router.get("/api/hello-world", getPeople)
  .get("/api/hello-world/:id", getPerson)
  .post("/api/hello-world", addPerson)
  .put("/api/hello-world:id", updatePerson)
  .delete("/api/hello-world:id", deletePerson);

export default router;
