export async function login(username: string, password: string) {
  if (username === "admin" && password === "1234") {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", username);
    }
    return { success: true, message: "Login successful!" };
  }
  return { success: false, message: "Invalid username or password" };
}

export async function register(username: string, password: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", username);
  }
  return { success: true, message: "Registered successfully!" };
}
