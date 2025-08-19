// middleware.ts (raíz)
import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // evita ficheros estáticos, _next, etc.
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
