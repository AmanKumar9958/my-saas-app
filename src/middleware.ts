import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/tools(.*)',
  '/user-dashboard(.*)',
  '/account(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth({ treatPendingAsSignedOut: false });

    if (!userId) {
      const desiredPath = `${req.nextUrl.pathname}${req.nextUrl.search}`;
      const res = NextResponse.redirect(new URL("/", req.url));

      // Use cookies instead of query params to avoid showing
      // /?login=true&redirect=... in the URL.
      res.cookies.set("showLogin", "true", { path: "/", sameSite: "lax" });
      res.cookies.set("postLoginRedirect", encodeURIComponent(desiredPath), { path: "/", sameSite: "lax" });

      return res;
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};