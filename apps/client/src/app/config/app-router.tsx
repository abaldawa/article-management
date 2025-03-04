/**
 * @author Abhijit Baldawa
 */

import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router";
import { Login } from "../modules/auth/containers/Login";
import { useAuthContext } from "../shared/services/auth/auth-context";
import { UserAvatar } from "../shared/components/user-avatar";
import { Articles } from "../modules/article/containers/articles";
import { ArticleDetails } from "../modules/article/containers/article-details";

const AppRouter = () => {
  const { auth, logout } = useAuthContext();

  return (
    <BrowserRouter>
      <header className="bg-gray-800 text-white p-4">
        <nav className="  flex justify-between items-center">
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive ? "text-xl font-bold text-blue-500" : "text-xl font-bold"
            }
          >
            Articles
          </NavLink>
          {auth ? (
            <UserAvatar analyst={auth.user} onClick={logout} />
          ) : (
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                isActive ? "text-xl text-blue-500" : "text-xl"
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>
      <Routes>
        {!auth && (
          <Route path="auth">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
          </Route>
        )}
        <Route path="articles">
          <Route index element={<Articles />} />
          <Route path=":slug" element={<ArticleDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/articles" />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
