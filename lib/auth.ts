const TOKEN_KEY = 'auth_token';

export const authService = {

  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },


  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  logout: () => {
    authService.removeToken();
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getAuthHeaders: () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};