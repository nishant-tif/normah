// Type definitions for the application

export interface LoginCredentials {
  user_email: string;
  user_password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface Policy {
  policy_id: string | null | undefined;
  id: string;
  policyName: string;
  metricName: string;
  operator: string;
  expectedValue: string;
  severity: "Low" | "Medium" | "High";
  description: string;
}

export interface Model {
  model_id: string;
  id: string;
  name: string;
  version: string;
  owner: string;
  organizations: string;
  framework: string;
  riskCategory: "Low" | "Medium" | "High" | "Good";
  artifactLocation: string;
  policy: string;
}

export interface Organization {
  id: string;
  name: string;
  organizationsName: string;
  email: string;
  address: string;
  state: string;
  city: string;
}
export interface Article {
  id: string;
  article_title: string;
  author_id: string;
}

export interface DashboardData {
  healthScore: number;
  totalModels: number;
  highRiskModels: number;
  completeModels: number;
  criticalIssues: number;
  riskAssessment: {
    critical: { count: number; items: string[] };
    high: { count: number; items: string[] };
    medium: { count: number; items: string[] };
    low: { count: number; items: string[] };
  };
  compliance: {
    overall: number;
    euAiAct: number;
    iso42001: number;
    indiaDpdpAct: number;
    oecdPrinciples: number;
  };
  activeAlerts: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  aiSystems: Array<{
    id: string;
    systemName: string;
    riskLevel: string;
    compliance: number;
    status: string;
  }>;
}
