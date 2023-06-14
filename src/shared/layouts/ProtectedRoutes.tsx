import { Navigate, Outlet } from "react-router-dom";
import { RoutesEnum } from "../utils/enums";

export const LoggedOutProtection = () => {
  const auth = localStorage.getItem("token");

  return auth ? <Outlet /> : <Navigate to={RoutesEnum.login} />;
};

export const LoggedInProtection = () => {
  const auth = localStorage.getItem("token");

  return auth ? <Navigate to={RoutesEnum.home} /> : <Outlet />
}
