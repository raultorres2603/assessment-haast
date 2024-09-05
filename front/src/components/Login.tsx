import toast from "react-hot-toast";
import cfg from "../config/config.json";

export const Login = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const pass = data.get("pass");

    if (username && pass) {
      const loadingToast = toast.loading("Iniciando sesión...");
      try {
        const response = await fetch(`${cfg.domain}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, pass: pass }),
        });
      } catch (error) {
        toast.error("Error al iniciar sesión", { id: loadingToast });
      }
    }
  };

  return (
    <div className="logInContainer ">
      <div className="titleLogin text-6xl">Iniciar Sesión</div>
      <div className="formLogin justify-center items-center mt-5">
        <form onSubmit={handleSubmit} method="post">
          <div className="grid grid-cols-2 gap-4">
            <div className="username grid grid-rows-2 w-full">
              <label htmlFor="username" className="text-2xl">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="text-2xl text-center"
              />
            </div>
            <div className="pass grid grid-rows-2 w-full">
              <label htmlFor="pass" className="text-2xl">
                Password
              </label>
              <input
                type="text"
                name="pass"
                id="pass"
                className="text-2xl text-center"
              />
            </div>
          </div>
          <div className="buttonLogIn w-full mt-5">
            <button type="submit" className="text-2xl text-center w-full">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
