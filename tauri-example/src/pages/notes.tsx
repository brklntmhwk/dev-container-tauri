import { useEffect } from "react";
import { useAsyncFn } from "react-use";
import { Watch as Loading } from "react-loader-spinner";
import { fetchAllNotes, fetchNote, addNote, deleteNote } from "../services/api";

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
    <div>
      <h1>Note List</h1>
      <div className="grid gap-5">
        {notes.value!.map((note) => (
          <div className="border border-zinc-400 p-4">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={async () =>
            await addNote({ title: "Dammy note", content: "Dammy content" })
          }
        >
          Add note
        </button>
      </div>
    </div>
  );
};

export default NotesPage;
