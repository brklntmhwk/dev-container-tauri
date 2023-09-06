import { useLocation, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import GreetMessage from "./components/greet-message";

type AppProps = {
  children: React.ReactNode;
};

const App = ({ children }: AppProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 min-h-screen flex-col items-center justify-between px-4 py-16">
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
      <GreetMessage />
      <div className="mt-10 lg:mt-0 relative grid gap-4 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        {children}
      </div>
    </div>
  );
};

export default App;
