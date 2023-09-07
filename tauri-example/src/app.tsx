import { useLocation, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import GreetMessage from "./components/greet-message";
import { navigatePageEvent } from "./services/event";

type AppProps = {
  children: React.ReactNode;
};

const App = ({ children }: AppProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  navigatePageEvent.useNavigatePageListener((path: string) =>
    navigate(path, { replace: true })
  );

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
      <div className="mt-10 lg:mt-0 relative grid gap-4 place-items-center">
        {children}
      </div>
    </div>
  );
};

export default App;
