/**
 * @author Abhijit Baldawa
 */

import axios from "axios";
import { Analyst } from "../types/analyst";
import { ApiSuccessResponse } from "../types/server-response";

type LoginResponse = {
  token: string;
  user: Analyst;
};

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<ApiSuccessResponse<LoginResponse>>(
    `/api-service/auth/login`,
    { analystSlug: username, password }
  );

  return response.data.data;
};

export { login };
