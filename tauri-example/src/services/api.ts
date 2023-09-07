/* An entry point of Tauri API for frontend */

import { invoke } from "@tauri-apps/api/tauri";
import * as DB from "./database";
import { refreshNotesEvent } from "./event";

export const greet = async (name: string): Promise<string> => {
  return invoke("greet", { name });
};

export const fetchAllNotes = async () => {
  const notes = await DB.fetchAllNotes();

  return notes;
};

export const fetchNote = async (noteId: DB.Note["note_id"]) => {
  const note = await DB.fetchNote(noteId);

  return note;
};

export const addNote = async (
  newNote: Omit<DB.Note, "note_id" | "created_at">
) => {
  const note = await DB.addNote(newNote);

  return note;
};

export const deleteNote = async (noteId: DB.Note["note_id"]) => {
  await DB.deleteNote(noteId);
  refreshNotesEvent.emitRefreshNotes();
};
