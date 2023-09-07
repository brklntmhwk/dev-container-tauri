CREATE TABLE IF NOT EXISTS notes
(
  note_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

CREATE UNIQUE INDEX unique_notes_index ON notes (title);
