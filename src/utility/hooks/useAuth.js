export const useAuth = () => {
  const isLoggedIn = true;
  const user = { id: '1234', name: 'Sample Bob', email: 'bob@mock.com' };
  const token = 'sample-token';

  return { isLoggedIn, user, token };
};
