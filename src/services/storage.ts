export const setAuthToken = (token: string): void => {
  document.cookie = `user=${token}; path=/;`;
};

export const getAuthToken = (): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "user") {
      return value;
    }
  }
  return null;
};

export const removeAuthToken = (): void => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
