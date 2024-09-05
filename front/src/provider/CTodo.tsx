import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";

export const cTodoContext = createContext<{
  token: null | string;
  setToken: (token: null | string) => void;
}>({ token: null, setToken: () => {} });

export const CTodo = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<null | string>(
    sessionStorage?.getItem("token")
  );
  return (
    <cTodoContext.Provider value={{ token, setToken }}>
      <Toaster />
      {children}
    </cTodoContext.Provider>
  );
};
