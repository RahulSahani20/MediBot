// api.jsx

const API_URL = "http://localhost:8000"; // Change this if deployed

// === Auth-related ===

export async function registerUser(email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Registration failed");
  }

  return res.json(); // { msg: "User registered successfully" }
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Login failed");
  }

  const data = await res.json(); // { access_token, token_type }
  localStorage.setItem("access_token", data.access_token);
  return data;
}

export function logoutUser() {
  localStorage.removeItem("access_token");
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

// === Protected API Calls ===

function authHeaders() {
  const token = getAccessToken();
  if (!token) throw new Error("No token available");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchChats() {
  const res = await fetch(`${API_URL}/chat`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Failed to fetch chats");
  }

  return res.json(); // List of chat objects
}

export async function saveChat(title, messages) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, messages }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Failed to save chat");
  }

  return res.json(); // { id: ... }
}

export async function updateChat(chatId, messages) {
  const res = await fetch(`${API_URL}/chat/${chatId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Failed to update chat");
  }

  return res.json(); // Updated chat
}

// === QnA Query API ===

export async function askQuery(query, language = "English") {
  const res = await fetch(`${API_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, language }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Query failed");
  }

  return res.json(); // { result, sources }
}
