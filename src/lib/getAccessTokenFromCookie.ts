export function getAccessTokenFromCookie(
  cookieName: string = "access_token"
): string | null {
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const accessTokenCookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
  if (!accessTokenCookie) {
    return null;
  }
  return accessTokenCookie.split("=")[1];
}
