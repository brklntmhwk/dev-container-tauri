import Link from "../components/link";
import GreetMessage from "../components/greet-message";
import reactLogo from "../assets/react.svg";

const HomePage = () => {
  return (
    <div className="grid gap-4 place-items-center">
      <h1>Hello, world!!!</h1>
      <div className="flex gap-5">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <nav>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/notes"}>Notes</Link>
        </li>
        <li>
          <Link to={"/log"}>Log</Link>
        </li>
        <li>
          <Link to={"/search"}>Search</Link>
        </li>
      </nav>
      <GreetMessage />
    </div>
  );
};

export default HomePage;
