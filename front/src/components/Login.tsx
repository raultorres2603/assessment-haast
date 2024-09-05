import toast from "react-hot-toast";
import { useState } from "react";
import cfg from "../config/config.json";

export const Login = () => {
  const [action, setAction] = useState("login");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username")?.toString();
    const pass = data.get("pass")?.toString();

    if (username?.trim() !== "" && pass?.trim() !== "") {
      if (action === "login") {
        const loading = toast.loading("Cargando...");
        try {
          const response = await fetch(`${cfg.domain.toString()}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              pass: pass,
            }),
          });
          const data = await response.json();
          if (data.token) {
            toast.success("Logeado", { id: loading });
            sessionStorage.setItem("token", data.token);
            window.location.pathname = "/";
          } else if (data.error) {
            toast.error("Usuario no encontrado", { id: loading });
          }
        } catch (error) {
          console.log(error);
          toast.error("Error de servidor", { id: loading });
        }
      } else {
        const loading = toast.loading("Cargando...");
        try {
          const response = await fetch(
            `${cfg.domain.toString()}/api/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                pass: pass,
              }),
            }
          );
          const data = await response.json();
          if (data.token) {
            toast.success("Registrado", { id: loading });
            sessionStorage.setItem("token", data.token);
            window.location.pathname = "/";
          } else if (data.error) {
            toast.error("Error de servidor", { id: loading });
          }
        } catch (error) {
          console.log(error);
          toast.error("Error de servidor");
        }
      }
    } else {
      toast.error("Todos los campos son obligatorios");
    }
  };

  return (
    <div className="logInContainer">
      <div className="titleLogin text-6xl text-6xl">LogIn</div>
      <div className="formLogin justify-center items-center mt-5">
        <form onSubmit={handleSubmit} method="post">
          <div className="grid lg:grid-cols-2 grid-rows-2 gap-4">
            <div className="username grid grid-rows-1">
              <label htmlFor="username" className="text-xl">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="text-xl text-center"
              />
            </div>
            <div className="pass grid grid-rows-1">
              <label htmlFor="pass" className="text-xl">
                Password
              </label>
              <input
                type="text"
                name="pass"
                id="pass"
                className="text-xl text-center"
              />
            </div>
          </div>
          <div className="buttonLogIn w-full grid grid-cols-3 gap-2 mt-5">
            <button
              type="submit"
              className={`text-8 text-center ${
                action == "login" ? "animate-pulse bg-sky-500" : "¡"
              }`}
              disabled={action == "register" ? true : false}
            >
              Entrar
            </button>
            <button
              type="button"
              className="text-8 text-center"
              onClick={() =>
                setAction(action == "login" ? "register" : "login")
              }
            >
              ó
            </button>
            <button
              type="submit"
              className={`text-8 text-center ${
                action == "register" ? "animate-pulse bg-sky-500" : ""
              }`}
              disabled={action == "login" ? true : false}
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
