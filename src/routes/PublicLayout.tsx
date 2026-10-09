import { Outlet } from "react-router-dom";
import PublicLanguageLoader from "./PublicLanguageLoader";

const PublicLayout = () => {
  return (
    <PublicLanguageLoader>
      <Outlet />
    </PublicLanguageLoader>
  );
};

export default PublicLayout;