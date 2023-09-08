import { useState } from "react";
import { greet } from "../services/api";

const GreetMessage = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="grid gap-4 place-items-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setGreetMsg(await greet(name));
        }}
      >
        <input
          className="p-2.5"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit" className="btn ml-3">
          Greet
        </button>
      </form>
      <p>{greetMsg}</p>
    </div>
  );
};

export default GreetMessage;
