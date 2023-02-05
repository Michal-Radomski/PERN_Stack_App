export const validPassword = (password: string): boolean => {
  //* Password must contain at least one uppercase letter, one lowercase letter and one number'
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
  //* Password must contain at least one letter and one number'
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]/;
  return passwordRegex.test(password);
};

export const validEmail = (userEmail: string): boolean => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(userEmail);
};
