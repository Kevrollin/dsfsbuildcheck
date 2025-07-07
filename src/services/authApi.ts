const BASE_URL = "http://localhost:5000"; // Change to your backend's base URL

// Example: Login function
export async function login(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
}

// Add more functions as needed...
