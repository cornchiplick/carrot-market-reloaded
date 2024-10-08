export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/);
export const PASSWORD_REGEX_ERROR =
  "A password must have lowercase, UPPERCASE, a numnber and special characters";
export const LIMIT_FILE_SIZE = 1024 * 1024 * 4; // 4MB
