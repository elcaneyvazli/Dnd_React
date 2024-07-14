import "./App.css";
import KanbanBoard from "./Kanban/KanbanBoard";

function App() {
  return (
    <div className=" px-32 py-64 container bg-primary min-h-screen min-w-full">
      <KanbanBoard />
    </div>
  );
}

export default App;
