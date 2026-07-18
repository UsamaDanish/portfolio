import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Next.js 16 renamed the `middleware` convention to `proxy` (same behavior).
 * next-intl's routing middleware handles locale detection and the /→/en
 * redirect; the factory returns a plain (request) => response, so it drops
 * straight into this file.
 */
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes, and anything with a file extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
