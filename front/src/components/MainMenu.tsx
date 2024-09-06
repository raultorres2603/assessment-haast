export const MainMenu = () => {
  return (
    <div className="mainMenu">
      <div className="titleMain text-3xl">ToDoApp</div>
      <div className="grid grid-cols-3 border border-5 rounded-lg gap-4">
        <div className="toDoColumn">
          <div className="titleColumn">To Do</div>
        </div>
        <div className="doingColumn">
          <div className="titleColumn">Doing</div>
        </div>
        <div className="doneColumn">
          <div className="titleColumn">Done</div>
        </div>
      </div>
    </div>
  );
};
