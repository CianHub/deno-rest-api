import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getPeople,
  getPerson,
  addPerson,
  deletePerson,
  updatePerson,
} from "./controllers/people.controller.ts";

// Create router object
const router = new Router();

// Set the endpoints
router
  .get("/api/hello-world/:id", getPerson)
  .put("/api/hello-world/:id", updatePerson)
  .delete("/api/hello-world/:id", deletePerson)
  .get("/api/hello-world", getPeople)
  .post("/api/hello-world", addPerson);

export default router;
