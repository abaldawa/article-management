/**
 * @author Abhijit Baldawa
 */

import { AppRouter } from "./config/app-router";
import { AuthContextProvider } from "./shared/services/auth/auth-context";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export { App };
