export function logout(): void {
  document.cookie = "access_token=;path=/;";
  window.location.href = "/signin";
}
