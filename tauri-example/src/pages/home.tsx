import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Tauri example Home</h1>
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
    </div>
  );
};

export default HomePage;
