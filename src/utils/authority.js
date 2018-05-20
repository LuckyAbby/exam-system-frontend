// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('authority-user') || 'guest';
}

export function setAuthority(authority) {
  return localStorage.setItem('authority-user', authority);
}
