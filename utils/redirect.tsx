import { Redirect } from 'next';

export const migrate = (
  code: 301 | 302 | 303 | 307 | 308,
): { redirect: Redirect } => ({
  redirect: {
    destination: '/',
    statusCode: code,
  },
});
