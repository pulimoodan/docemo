import { AuthService } from './AuthService';

export function requireAuthentication(gssp) {
  return async (context) => {
    const { req } = context;

    if (req.cookies) {
      const accessToken = req.cookies['docemo-admin-token'];

      try {
        const user = await AuthService.getUser();
        console.log('user', user);

        if (!accessToken || !user || !user.email) {
          return {
            redirect: {
              permanent: false,
              destination: '/admin/login',
            },
          };
        }
      } catch (error) {
        return {
          redirect: {
            permanent: false,
            destination: '/admin/login',
          },
        };
      }
    }

    return gssp(context);
  };
}
