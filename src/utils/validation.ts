export const validateRegisterForm = (
  userName: string,
  email: string,
  password: string
): boolean => {
  return (
    userName.trim() !== "" &&
    validateEmail(email) &&
    password.trim().length >= 6
  );
};

export const validateLoginForm = (email: string, password: string): boolean => {
  return validateEmail(email) && password.trim() !== "";
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
