export function getTokenFromCookie(
  cookieName: string = "token"
): string | null {
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const tokenCookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
  if (!tokenCookie) {
    return null;
  }
  return tokenCookie.split("=")[1];
}
