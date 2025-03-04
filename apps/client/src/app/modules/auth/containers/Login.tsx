/**
 * @author Abhijit Baldawa
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../../shared/services/auth/api";
import { useCallApi } from "../../../shared/hooks/use-api-call";
import { useAuthContext } from "../../../shared/services/auth/auth-context";

const Login: React.FC = () => {
  const { setAuthDetails } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginService = useCallApi(login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await loginService.callApi(username, password);
  };

  useEffect(() => {
    if (loginService.data) {
      setAuthDetails(loginService.data.token, loginService.data.user);
      navigate("/");
    }
  }, [loginService.data]);

  return (
    <article className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        {!!loginService.error && (
          <p className="text-red-500 mb-4">Error in login</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loginService.loading}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </article>
  );
};

export { Login };
