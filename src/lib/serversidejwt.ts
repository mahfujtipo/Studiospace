import { headers } from "next/headers";
import { auth } from "./auth";

export const serversidejwt = async () => {
  const jwttoken = await auth.api.getToken({
    headers: await headers(),
  });

  const token = jwttoken?.token;
  return token;
};
