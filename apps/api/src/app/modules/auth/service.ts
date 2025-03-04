import { eq } from "drizzle-orm";
import { db } from "../../database/db";
import { analysts } from "../../database/models";
import { NotfoundError } from "../../utils/errors/error-types/not-found-error";
import { jwtVerify, SignJWT } from "jose";
import { createSecretKey } from "crypto";
import { ValidationError } from "../../utils/errors/error-types/validation-error";

export type SessionUser = { user: typeof analysts.$inferSelect };

const secretKey = createSecretKey(Buffer.from("my_secret_key", "utf-8"));

const login = async (
  analystSlug: string
): Promise<{ token: string; user: SessionUser["user"] }> => {
  const [analyst] = await db
    .select()
    .from(analysts)
    .where(eq(analysts.slug, analystSlug));

  if (!analyst) {
    throw new NotfoundError(`user with slug '${analystSlug}' not found`);
  }

  const sessionUser: SessionUser = { user: analyst };
  const token = await new SignJWT(sessionUser)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey);

  return {
    token,
    user: sessionUser.user,
  };
};

const getSessionUserFromToken = async (
  token: string
): Promise<SessionUser["user"]> => {
  try {
    const { payload } = await jwtVerify<SessionUser>(token, secretKey);
    return payload.user;
  } catch (error) {
    throw new ValidationError("Invalid token");
  }
};

export { login, getSessionUserFromToken };
