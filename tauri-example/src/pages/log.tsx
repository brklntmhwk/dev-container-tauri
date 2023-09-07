import ErrorPage from "./error";
import { fetchAllNotes, fetchNote, addNote, deleteNote } from "../services/api";

const LogPage = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await addNote({ title: "Dammy note", content: "Dammy content" });
          console.log("done!");
        }}
      >
        Add note
      </button>
    </div>
  );
};

export default LogPage;
