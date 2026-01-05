import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/tools(.*)',
  '/dashboard(.*)',
  '/account(.*)'
]);

export default clerkMiddleware((auth, req) => {
  const pathname = new URL(req.url).pathname;

  if (isProtectedRoute(pathname)) {
    // This will automatically redirect unauthenticated users to the sign-in page
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};