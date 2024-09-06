import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import cfg from "../config/config.json";
import { Todo } from "../classes/Todo";

export const MainMenu = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  useEffect(() => {
    const getTodos = async () => {
      const loadingToast = toast.loading("Cargando...");
      try {
        const response = await fetch(
          `${cfg.domain.toString()}/api/tasks?token=${sessionStorage.getItem(
            "token"
          )}`
        );
        const data = await response.json();
        data.tasks.forEach((task: Todo) => {
          Object.setPrototypeOf(task, Todo.prototype);
        });
        setTodos(data.tasks);
        console.log(data.tasks);
        toast.success("Tareas cargadas", { id: loadingToast });
      } catch (error) {
        console.log(error);
        if (
          (error instanceof Error && error.name === "JWSInvalid") ||
          (error instanceof Error && error.name == "JWTExpired")
        ) {
          sessionStorage.removeItem("token");
          window.location.pathname = "/";
        } else {
          toast.error("Error al cargar las tareas", { id: loadingToast });
          sessionStorage.removeItem("token");
          window.location.pathname = "/";
        }
      }
    };
    getTodos();
  }, []);

  const createTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nameTodo = data.get("nameTodo")?.toString();
    if (nameTodo?.trim() !== "") {
      const loading = toast.loading("Añadiendo...");
      const newTodo = new Todo(nameTodo as string, "toDo");
      console.log(newTodo);
      try {
        const addTask = await fetch(`${cfg.domain.toString()}/api/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: sessionStorage.getItem("token"),
            task: {
              state: newTodo.state,
              title: newTodo.title,
            },
          }),
        });
        const data = await addTask.json();
        if (data.taskId) {
          newTodo.id = data.taskId;
          setTodos([...todos, newTodo]);
          toast.success("Tarea añadida", { id: loading });
        }
      } catch (error) {
        if (
          (error instanceof Error && error.name === "JWSInvalid") ||
          (error instanceof Error && error.name == "JWTExpired")
        ) {
          sessionStorage.removeItem("token");
          window.location.pathname = "/";
        }
        console.log(error);
        toast.error("Error al añadir la tarea", { id: loading });
      }
    } else {
      toast.error("Debe rellenar todos los campos");
    }
  };

  const changeStatus = async (state: string, todo: Todo) => {
    const loading = toast.loading("Actualizando...");
    try {
      const updateTask = await fetch(
        `${cfg.domain.toString()}/api/tasks/${
          todo.id
        }?token=${sessionStorage.getItem("token")}&state=${state}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await updateTask.json();
      if (data.modifiedCount > 0) {
        todo.state = state;
        setTodos([...todos]);
        toast.success("Tarea actualizada", { id: loading });
      }
    } catch (error) {
      if (
        (error instanceof Error && error.name === "JWSInvalid") ||
        (error instanceof Error && error.name == "JWTExpired")
      ) {
        sessionStorage.removeItem("token");
        window.location.pathname = "/";
      }
      console.log(error);
      toast.error("Error al actualizar la tarea", { id: loading });
    }
  };

  const deleteTodo = async (todo: Todo) => {
    const loading = toast.loading("Eliminando...");
    try {
      const deleteTask = await fetch(
        `${cfg.domain.toString()}/api/tasks/${
          todo.id
        }?token=${sessionStorage.getItem("token")}`,
        {
          method: "DELETE",
        }
      );
      const data = await deleteTask.json();
      if (data.deleteCount > 0) {
        // Filtrar todos, dejar solo los que no sean el que se ha eliminado (id)
        setTodos([...todos.filter((t) => t.id !== todo.id)]);
        toast.success("Tarea eliminada", { id: loading });
      }
    } catch (error) {
      if (
        (error instanceof Error && error.name === "JWSInvalid") ||
        (error instanceof Error && error.name == "JWTExpired")
      ) {
        sessionStorage.removeItem("token");
        window.location.pathname = "/";
      }
      console.log(error);
      toast.error("Error al eliminar la tarea", { id: loading });
    }
  };

  return (
    <div className="mainMenu">
      <div className="titleMain text-3xl">ToDoApp</div>
      <div className="formNewTodo mt-5 mb-5">
        <form onSubmit={createTodo} method="post">
          <div className="grid grid-cols-2 gap-4">
            <div className="inputNewTodo">
              <div className="grid grid-cols-1 h-full">
                <input
                  type="text"
                  name="nameTodo"
                  placeholder="Nombre tarea"
                  className="text-center text-xs lg:text-xl justify-center items-center"
                  required
                />
              </div>
            </div>
            <div className="buttonNewTodo">
              <div className="grid grid-rows-1">
                <button
                  type="submit"
                  className="text-xs lg:text-xl justify-center items-center hover:scale-110 transition duration-200 bg-blue-500 hover:bg-blue-600"
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 border border-5 rounded-lg gap-4">
        <div className="toDoColumn">
          <div className="titleColumn bg-sky-500 rounded-lg">Por hacer</div>
          <div className="grid grid-cols-1">
            {todos.map((todo) => {
              if (todo.state === "toDo") {
                return (
                  <div
                    key={todo.id}
                    className="todo p-1 text-md text-center border border-5 rounded-lg bg-yellow-500 text-black"
                  >
                    <div className="grid grid-cols-3">
                      <div className="todoChangeState">
                        <button
                          className="transition duration-200 text-xs justify-center items-center bg-red-500 hover:bg-red-600 hover:scale-110 lg:text-md"
                          onClick={async () => {
                            await deleteTodo(todo);
                          }}
                        >
                          Eliminar!
                        </button>
                      </div>
                      <div className="todoTitle">{todo.title}</div>
                      <div className="todoChangeState">
                        <button
                          className="transition duration-200 text-xs lg:text-md justify-center items-center bg-green-500 hover:bg-green-600 hover:scale-110"
                          onClick={async () => {
                            await changeStatus("doing", todo);
                          }}
                        >
                          Empezar!
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="doingColumn">
          <div className="titleColumn bg-sky-500 rounded-lg">Haciendo</div>
          <div className="grid grid-cols-1">
            {todos.map((todo) => {
              if (todo.state === "doing") {
                return (
                  <div
                    key={todo.id}
                    className="todo p-1 text-md text-center border border-5 rounded-lg bg-sky-500 text-black"
                  >
                    <div className="grid grid-cols-3">
                      <div className="todoChangeState">
                        <button
                          className="transition duration-200 text-xs lg:text-md justify-center items-center bg-red-500 hover:bg-red-600 hover:scale-110"
                          onClick={async () => {
                            await changeStatus("toDo", todo);
                          }}
                        >
                          Retroceder!
                        </button>
                      </div>
                      <div className="todoTitle">{todo.title}</div>
                      <div className="todoChangeState">
                        <button
                          className="transition duration-200 text-xs lg:text-md justify-center items-center bg-green-500 hover:bg-green-600 hover:scale-110"
                          onClick={async () => {
                            await changeStatus("done", todo);
                          }}
                        >
                          Acabado!
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="doneColumn">
          <div className="titleColumn bg-sky-500 rounded-lg">Hecho</div>
          <div className="grid grid-cols-1">
            {todos.map((todo) => {
              if (todo.state === "done") {
                return (
                  <div
                    key={todo.id}
                    className="todo p-1 text-md text-center border border-5 rounded-lg bg-green-500 text-black"
                  >
                    <div className="grid grid-cols-3">
                      <div className="todoChangeState">
                        <button
                          className="transition duration-200 text-xs lg:text-md justify-center items-center bg-red-500 hover:bg-red-600 hover:scale-110"
                          onClick={async () => {
                            await changeStatus("doing", todo);
                          }}
                        >
                          Retroceder!
                        </button>
                      </div>
                      <div className="todoTitle">{todo.title}</div>
                      <div className="todoChangeState">
                        <button
                          className="transition duration-200 text-xs lg:text-md justify-center items-center bg-red-500 hover:bg-red-600 hover:scale-110"
                          onClick={async () => {
                            await deleteTodo(todo);
                          }}
                        >
                          Eliminar!
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
