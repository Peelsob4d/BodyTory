import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
const cookieOptions = {
  cookieName: "userSession",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 3,
  },
};
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
