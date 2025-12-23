import { Router } from "express";
const journalRoute = Router();
import { getJournals, createJournal, getJournalById, deleteJournal, updateJournal } from "../controllers/journalController.js";
import { authenticateToken } from "../middleware/authProtection.js";

journalRoute.post("/create", authenticateToken, createJournal)
journalRoute.get("/", authenticateToken, getJournals)
journalRoute.get("/:id", authenticateToken, getJournalById);
journalRoute.delete("/:id", authenticateToken, deleteJournal);
journalRoute.put("/:id", authenticateToken, updateJournal);

export default journalRoute;