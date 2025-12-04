const apiConfig = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  SUDOKU: {
    SAVE: "/sudoku/save",
    GET: "/sudoku",
    DELETE: "/sudoku/delete",
  },
  PROGRESS: {
    SAVE: "/progress/save",
    UPDATE: "/progress/update",
    GET: "/progress",
    DELETE: "/progress/delete",
  },
};

export default apiConfig;
