import { Route, Routes } from "react-router";

import { menuItems } from "../../router/menu";
import ProtectedRoute from "../../router/PrivateRouter";
import PublicRoute from "../../router/PublicRouter";

import "./Content.css";

export default function Content() {
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
}
