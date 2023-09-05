import Database from "tauri-plugin-sql-api";
import { format, parseISO } from "date-fns";

type Note = {
  note_id: number
  title: string
  content: string
  created_at: string
}

const connectToDB = async () => Database.load("postgres://postgres:postgres@localhost:5432/db")

const fetchAllNotes = async () => {
  const db = await connectToDB()
  const notes = await db.select<Note[]>("SELECT * FROM notes")

  return notes
}

const fetchNote = async (noteId: Note["note_id"]) => {
  const db = await connectToDB()
  const note = await db.select<Note>("SELECT * FROM notes WHERE note_id = $1", [noteId])

  return note
}

const addNote = async (newNote: Omit<Note, "note_id" | "created_at">) => {
  const db = await connectToDB()
  const note = await db.execute("INSERT INTO notes (title, content) VALUES ($1, $2)", [newNote.title, newNote.content])

  return note
}

const deleteNote = async (noteId: Note["note_id"]) => {
  const db = await connectToDB()
  await db.execute("DELETE FROM notes WHERE note_id = $1", [noteId])
}

export {connectToDB, fetchNote, fetchAllNotes, addNote, deleteNote}
