const users = [
  {
    username: "admin",
    password: "adminpass",
    role: "admin",
    token: "admin-token",
  },
  {
    username: "user",
    password: "pass",
    role: "user",
    token: "user-token",
  },
];

export function verifyUser(username, password) {
  const userFound = users.find(
    (user) => user.username === username && user.password === password
  );

  return userFound ? { role: userFound.role, token: userFound.token } : null;
}
