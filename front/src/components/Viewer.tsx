import { cTodoContext } from "../provider/CTodo";
import { MainMenu } from "./MainMenu";
import { Login } from "./Login";
import { useContext } from "react";

export const Viewer = () => {
  const { token } = useContext(cTodoContext);
  function handleView() {
    if (token) {
      return <MainMenu />;
    } else {
      return <Login />;
    }
  }

  return handleView();
};
