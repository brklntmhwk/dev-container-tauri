import { useEffect } from "react";
import { useAsyncFn } from "react-use";
import { Watch as Loading } from "react-loader-spinner";
import {
  fetchAllNotes,
  fetchNote,
  addNote,
  deleteNote,
  openNoteView,
} from "../services/api";

const NotesPage = () => {
  const [notes, invokeFetchAllNotes] = useAsyncFn(fetchAllNotes, [], {
    loading: true,
  });

  useEffect(() => {
    invokeFetchAllNotes().then();
  }, []);

  if (notes.error) return <div>Failed to fetch notes...</div>;

  if (notes.loading)
    return (
      <Loading
        height="50"
        width="50"
        radius="48"
        color="#000000"
        ariaLabel="Loading..."
      />
    );

  return (
    <div className="grid gap-4 place-items-center">
      <h1>Note List</h1>
      <div className="grid gap-5">
        {notes.value!.map((note) => (
          <div key={note.note_id} className="border border-zinc-400 p-4">
            <h2>{note.title}</h2>
            <p>{note.note_id === null ? "null!" : note.note_id}</p>
            <p>{note.content}</p>
            <p>{note.created_at}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className="btn"
          onClick={() =>
            openNoteView(notes.value![0].note_id, notes.value![0].title)
          }
          // onClick={async () =>
          //   await addNote({ title: "Dammy note", content: "Dammy content" })
          // }
        >
          Add note
        </button>
        <button
          className="btn"
          onClick={() => deleteNote(notes.value![0].note_id)}
        >
          Delete note
        </button>
      </div>
    </div>
  );
};

export default NotesPage;
