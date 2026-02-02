import { API_ENDPOINTS } from "@/config/api";
import type {
  DashboardData,
  Policy,
  Model,
  Organization,
  LoginCredentials,
  LoginResponse,
} from "@/types";
import apiClient from "./api";

/* ===============================
   AUTH SERVICE
=============================== */

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);

    // expected backend response:
    // { data: { user, accessToken } }

    return {
      token: response.data.data.accessToken,
      user: response.data.data.user,
    };
  },
  logout: async (credentials: LoginCredentials): Promise<void> => {
    const response = await apiClient.post(API_ENDPOINTS.LOGOUT, credentials);
    console.log("response logout", response);
    // expected backend response:
    // { data: { user, accessToken } }

    // return {
    //   token: response.data.data.accessToken,
    //   user: response.data.data.user,
    // };
  },
};

/* ===============================
   DASHBOARD SERVICE
=============================== */
export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    // In real app: return apiClient.get(API_ENDPOINTS.DASHBOARD).then(res => res.data)
    return {
      healthScore: 65,
      totalModels: 12,
      highRiskModels: 7,
      completeModels: 68,
      criticalIssues: 5,
      riskAssessment: {
        critical: { count: 2, items: ["Bias detected in loan approval model"] },
        high: { count: 6, items: ["Missing audit logs, privacy risks"] },
        medium: { count: 8, items: ["Documentation Gaps Identified"] },
        low: { count: 12, items: ["Minor updates needed"] },
      },
      compliance: {
        overall: 65,
        euAiAct: 72,
        iso42001: 85,
        indiaDpdpAct: 58,
        oecdPrinciples: 90,
      },
      activeAlerts: [
        {
          id: "1",
          title: "Missing Human Oversight",
          description: "Loan approval system violates EU AI Act Article 14.",
        },
        {
          id: "2",
          title: "Audit Log Gaps",
          description: "Loan approval system violates EU AI Act Article 14.",
        },
        {
          id: "3",
          title: "Missing Human Oversight",
          description: "Loan approval system violates EU AI Act Article 14.",
        },
      ],
      aiSystems: [
        {
          id: "1",
          systemName: "Claude Model",
          riskLevel: "High-Risk",
          compliance: 65,
          status: "Non-Complaint",
        },
        {
          id: "2",
          systemName: "Loan Approval AI",
          riskLevel: "High-Risk",
          compliance: 65,
          status: "Non-Complaint",
        },
        {
          id: "3",
          systemName: "FSI AI",
          riskLevel: "High-Risk",
          compliance: 65,
          status: "Non-Complaint",
        },
        {
          id: "4",
          systemName: "Claude Model",
          riskLevel: "High-Risk",
          compliance: 65,
          status: "Non-Complaint",
        },
        {
          id: "5",
          systemName: "Approval AI",
          riskLevel: "High-Risk",
          compliance: 65,
          status: "Non-Complaint",
        },
        {
          id: "6",
          systemName: "Loan Approval AI",
          riskLevel: "High-Risk",
          compliance: 65,
          status: "Non-Complaint",
        },
      ],
    };
  },
};

/* ===============================
   POLICY SERVICE
=============================== */
export const policyService = {
  getAll: async (): Promise<Policy[]> => {
    const response = await apiClient.get(API_ENDPOINTS.POLICIES);
    return response.data.data;
  },

  getById: async (id: string): Promise<Policy> => {
    const response = await apiClient.get(API_ENDPOINTS.POLICY_BY_ID(id));
    return response.data.data;
  },

  create: async (policy: Omit<Policy, "id">): Promise<Policy> => {
    const response = await apiClient.post(API_ENDPOINTS.POLICIES, policy);
    return response.data.data.policy;
  },

  update: async (id: string, policy: Partial<Policy>): Promise<Policy> => {
    console.log("policy", policy);
    const response = await apiClient.put(
      API_ENDPOINTS.POLICY_BY_ID(policy.policy_id || id),
      policy,
    );
    return response.data.data.policy;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.POLICY_BY_ID(id));
  },
};

/* ===============================
   MODEL SERVICE
=============================== */
export const modelService = {
  getAll: async (): Promise<Model[]> => {
    const response = await apiClient.get(API_ENDPOINTS.MODELS);
    return response.data.data;
  },

  getById: async (id: string): Promise<Model> => {
    const response = await apiClient.get(API_ENDPOINTS.MODEL_BY_ID(id));
    return response.data.data;
  },

  create: async (model: Omit<Model, "id">): Promise<Model> => {
    const response = await apiClient.post(API_ENDPOINTS.MODELS, model);
    return response.data.data.model;
  },

  update: async (id: string, model: Partial<Model>): Promise<Model> => {
    const response = await apiClient.put(API_ENDPOINTS.MODEL_BY_ID(id), model);
    return response.data.data.model;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.MODEL_BY_ID(id));
  },
};

/* ===============================
   ORGANIZATION SERVICE
=============================== */
export const organizationService = {
  getAll: async (): Promise<Organization[]> => {
    const response = await apiClient.get(API_ENDPOINTS.ORGANIZATIONS);
    return response.data.data;
  },

  getById: async (id: string): Promise<Organization> => {
    const response = await apiClient.get(API_ENDPOINTS.ORGANIZATION_BY_ID(id));
    return response.data.data;
  },

  create: async (
    organization: Omit<Organization, "id">,
  ): Promise<Organization> => {
    const response = await apiClient.post(
      API_ENDPOINTS.ORGANIZATIONS,
      organization,
    );
    return response.data.data.organization;
  },

  update: async (
    id: string,
    organization: Partial<Organization>,
  ): Promise<Organization> => {
    const response = await apiClient.put(
      API_ENDPOINTS.ORGANIZATION_BY_ID(id),
      organization,
    );
    return response.data.data.organization;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.ORGANIZATION_BY_ID(id));
  },
};
