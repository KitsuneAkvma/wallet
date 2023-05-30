const selectSessionUser = state => state.session.user;
const selectSessionLoginFormData = state => state.session.loginForm;
const selectSessionRegisterFormData = state => state.session.registerForm;
const selectSessionTransactionFormData = state => state.session.registerForm;
const selectSessionToken = state => state.session.token;
const selectSessionIsAuth = state => state.session.isAuth;
const selectSessionError = state => state.session.error;

const selectGlobalIsLoading = state => state.global.isLoading;
const selectGlobalModalLogoutState = state => state.global.isLoading;
const selectGlobalModalTransactionState = state => state.global.isLoading;

const selectFinanceBalance = state => state.finance.totalBalance;
const selectFinanceIsLoading = state => state.finance.totalBalance;
const selectFinanceData = state => state.finance.totalBalance;

export {
  selectSessionUser,
  selectSessionLoginFormData,
  selectSessionRegisterFormData,
  selectSessionTransactionFormData,
  selectSessionToken,
  selectSessionIsAuth,
  selectSessionError,
};

export { selectGlobalIsLoading, selectGlobalModalLogoutState, selectGlobalModalTransactionState };

export { selectFinanceBalance, selectFinanceIsLoading, selectFinanceData };
