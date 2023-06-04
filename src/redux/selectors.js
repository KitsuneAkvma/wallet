const selectSessionUser = state => state.session.user;
const selectSessionLoginFormData = state => state.session.loginForm;
const selectSessionRegisterFormData = state => state.session.registerForm;
const selectSessionTransactionFormData = state => state.session.registerForm;
const selectSessionToken = state => state.session.token;
const selectSessionIsAuth = state => state.session.isAuth;
const selectSessionError = state => state.session.error;

const selectGlobalIsLoading = state => state.global.isLoading;
const selectGlobalModalLogoutState = state => state.global.isModalLogoutOpen;
const selectGlobalModalAddTransactionState = state => state.global.isModalAddTransactionOpen;
const selectGlobalModalEditTransactionState = state => state.global.isModalEditTransactionOpen;
const selectIsCategoriesListOpen = state => state.global.isCategoriesListOpen;

const selectFinanceBalance = state => state.finance.totalBalance;
const selectFinanceIsLoading = state => state.finance.isLoading;
const selectFinanceData = state => state.finance.data;
const selectFinanceSelectedTransaction = state => state.finance.selectedTransaction;
const selectFinanceCategories = state => state.finance.categories;

export {
  selectSessionUser,
  selectSessionLoginFormData,
  selectSessionRegisterFormData,
  selectSessionTransactionFormData,
  selectSessionToken,
  selectSessionIsAuth,
  selectSessionError,
};

export {
  selectGlobalIsLoading,
  selectGlobalModalLogoutState,
  selectGlobalModalAddTransactionState,
  selectGlobalModalEditTransactionState,
  selectIsCategoriesListOpen,
};

export {
  selectFinanceBalance,
  selectFinanceIsLoading,
  selectFinanceData,
  selectFinanceSelectedTransaction,
  selectFinanceCategories,
};
