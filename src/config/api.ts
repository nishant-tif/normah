// API Configuration - Change this baseURL when real API is available
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.normah.ai", // Change this to your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 REQUIRED
};

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Policies
  POLICIES: "/policies",
  POLICY_BY_ID: (id: string) => `/policies/${id}`,

  // Models
  MODELS: "/models",
  MODEL_BY_ID: (id: string) => `/models/${id}`,

  // Organizations
  ORGANIZATIONS: "/organizations",
  ORGANIZATION_BY_ID: (id: string) => `/organizations/${id}`,
} as const;
