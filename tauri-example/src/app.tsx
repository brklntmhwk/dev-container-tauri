import { useLocation, useNavigate } from "react-router-dom";
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
      <div className="mt-10 lg:mt-0 relative grid gap-4 place-items-center">
        {children}
      </div>
    </div>
  );
};

export default App;
