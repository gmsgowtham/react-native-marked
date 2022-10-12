/**
 * Generates a random string
 * @returns string
 */
export const generateRandomString = () => {
  return Math.random().toString(36).substring(7);
};
