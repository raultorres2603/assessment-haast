import { Viewer } from "./components/Viewer";
import "./App.css";
import { CTodo } from "./provider/CTodo";

function App() {
  return (
    <>
      <CTodo>
        <Viewer />
      </CTodo>
    </>
  );
}

export default App;
