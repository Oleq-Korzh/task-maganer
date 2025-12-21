import { Route, Routes } from "react-router";

import { menuItems } from "../../router/menu";
import ProtectedRoute from "../../router/PrivateRouter";
import PublicRoute from "../../router/PublicRouter";

import "./Content.scss";

const Content = () => {
  return (
    <Routes>
      {menuItems.map(
        ({ path, Component, protected: isProtected, public: isPublic }) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                ) : isPublic ? (
                  <PublicRoute>
                    <Component />
                  </PublicRoute>
                ) : (
                  <Component />
                )
              }
            />
          );
        }
      )}
    </Routes>
  );
};

export default Content;
