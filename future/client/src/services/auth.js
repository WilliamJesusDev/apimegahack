const TOKEN_KEY = 'megahack';

export const login = async token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = async () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
