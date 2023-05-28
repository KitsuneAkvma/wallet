export const useAuth = () => {
  //   const isLoggedIn = useSelector(state => {
  //     state.session.isAuth;
  //   });

  //   const user = useSelector(state => {
  //     state.session.user;
  //   });
  //   const token = useSelector(state => {
  //     state.session.token;
  //   });

  const isLoggedIn = true;
  const user = { id: '123abc', name: 'bob', email: 'bob@mock.com' };
  const token = 'awdmawidm289m93fa89';
  return { isLoggedIn, user, token };
};
