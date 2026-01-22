// Dummy data service - This will be replaced by actual API calls
// All functions return promises to match real API behavior

import { API_ENDPOINTS } from '@/config/api';
import type { 
  DashboardData, 
  Policy, 
  Model, 
  Organization,
  LoginCredentials,
  LoginResponse 
} from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dummy data
const dummyPolicies: Policy[] = [
  { id: '1', policyName: 'demo policy', metricName: 'Accuracy', operator: '>=', expectedValue: '0.8', severity: 'High', description: 'Demo' },
  { id: '2', policyName: 'policy 1', metricName: 'Bias Flag', operator: '=', expectedValue: 'False', severity: 'Medium', description: 'Demo' },
  { id: '3', policyName: 'demo policy', metricName: 'Accuracy', operator: '>=', expectedValue: '0.8', severity: 'High', description: 'Demo' },
  { id: '4', policyName: '12 policy', metricName: 'Bias Flag', operator: '=', expectedValue: 'False', severity: 'Medium', description: 'Demo' },
  { id: '5', policyName: 'demo', metricName: 'Accuracy', operator: '>=', expectedValue: '0.8', severity: 'High', description: 'Demo' },
  { id: '6', policyName: 'demo policy', metricName: 'Bias Flag', operator: '=', expectedValue: 'False', severity: 'Medium', description: 'Demo' },
  { id: '7', policyName: '12 policy', metricName: 'Accuracy', operator: '>=', expectedValue: '0.8', severity: 'High', description: 'Demo' },
  { id: '8', policyName: 'Policy 2', metricName: 'Bias Flag', operator: '=', expectedValue: 'False', severity: 'Medium', description: 'Demo' },
];

const dummyModels: Model[] = [
  { id: '1', name: 'Claude Models', version: 'V2.0', owner: 'Data', organizations: 'Capgro', framework: 'Sklearn', riskCategory: 'High', artifactLocation: 'Models', policy: 'Pol 001' },
  { id: '2', name: 'Ge Chat Models', version: 'V2.0', owner: 'Team', organizations: 'FSL', framework: 'Sklearn', riskCategory: 'Medium', artifactLocation: 'v2.0', policy: 'Pol 001' },
  { id: '3', name: 'Chat Models', version: 'V2.0', owner: 'Science', organizations: 'Tif', framework: 'Sklearn', riskCategory: 'Good', artifactLocation: 'v2.0', policy: 'Pol 001' },
  { id: '4', name: 'Claude Models', version: 'V2.0', owner: 'Data', organizations: 'FSL', framework: 'Sklearn', riskCategory: 'High', artifactLocation: 'Models', policy: 'Pol 001' },
  { id: '5', name: 'Chat Models', version: 'V2.0', owner: 'Team', organizations: 'Capgro', framework: 'Sklearn', riskCategory: 'Good', artifactLocation: 'Models', policy: 'Pol 001' },
  { id: '6', name: 'Chat Models', version: 'V2.0', owner: 'Team', organizations: 'Tif', framework: 'Sklearn', riskCategory: 'High', artifactLocation: 'v2.0', policy: 'Pol 001' },
];

const dummyOrganizations: Organization[] = [
  { id: '1', name: 'John', organizationsName: 'The Ideaz Factory', email: 'John@theideazfactory.com', address: 'SCO 34, Second Floor, Sector 26, Chandigarh 160019', state: 'Chandigarh', city: 'Chandigarh' },
  { id: '2', name: 'Karan', organizationsName: 'Capgro', email: 'Karan@Capgro.com', address: 'SCO 34, Second Floor, Sector 26, Chandigarh 160019', state: 'Chandigarh', city: 'Chandigarh' },
  { id: '3', name: 'Mukesh', organizationsName: 'The Ideaz Factory', email: 'Mukesh@theideazfactory.com', address: 'SCO 34, Second Floor, Sector 26, Chandigarh 160019', state: 'Chandigarh', city: 'Chandigarh' },
  { id: '4', name: 'Sam Doe', organizationsName: 'Capgro', email: 'Sam@Capgro.com', address: 'SCO 34, Second Floor, Sector 26, Chandigarh 160019', state: 'Chandigarh', city: 'Chandigarh' },
  { id: '5', name: 'Nishant', organizationsName: 'Tif Tech', email: 'Nishant@Tech.com', address: 'SCO 34, Second Floor, Sector 26, Chandigarh 160019', state: 'Chandigarh', city: 'Chandigarh' },
  { id: '6', name: 'Raj', organizationsName: 'Capgro', email: 'Raj@Capgro.com', address: 'SCO 34, Second Floor, Sector 26, Chandigarh 160019', state: 'Chandigarh', city: 'Chandigarh' },
];

// API Service functions - Replace these with actual API calls
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    await delay(500);
    // Simulate login - in real app, call: apiClient.post(API_ENDPOINTS.LOGIN, credentials)
    if (credentials.email && credentials.password) {
      return {
        token: 'dummy_token_12345',
        user: { id: '1', email: credentials.email, name: 'User' },
      };
    }
    throw new Error('Invalid credentials');
  },
};

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    await delay(300);
    // In real app: return apiClient.get(API_ENDPOINTS.DASHBOARD).then(res => res.data)
    return {
      healthScore: 65,
      totalModels: 12,
      highRiskModels: 7,
      completeModels: 68,
      criticalIssues: 5,
      riskAssessment: {
        critical: { count: 2, items: ['Bias detected in loan approval model'] },
        high: { count: 6, items: ['Missing audit logs, privacy risks'] },
        medium: { count: 8, items: ['Documentation Gaps Identified'] },
        low: { count: 12, items: ['Minor updates needed'] },
      },
      compliance: {
        overall: 65,
        euAiAct: 72,
        iso42001: 85,
        indiaDpdpAct: 58,
        oecdPrinciples: 90,
      },
      activeAlerts: [
        { id: '1', title: 'Missing Human Oversight', description: 'Loan approval system violates EU AI Act Article 14.' },
        { id: '2', title: 'Audit Log Gaps', description: 'Loan approval system violates EU AI Act Article 14.' },
        { id: '3', title: 'Missing Human Oversight', description: 'Loan approval system violates EU AI Act Article 14.' },
      ],
      aiSystems: [
        { id: '1', systemName: 'Claude Model', riskLevel: 'High-Risk', compliance: 65, status: 'Non-Complaint' },
        { id: '2', systemName: 'Loan Approval AI', riskLevel: 'High-Risk', compliance: 65, status: 'Non-Complaint' },
        { id: '3', systemName: 'FSI AI', riskLevel: 'High-Risk', compliance: 65, status: 'Non-Complaint' },
        { id: '4', systemName: 'Claude Model', riskLevel: 'High-Risk', compliance: 65, status: 'Non-Complaint' },
        { id: '5', systemName: 'Approval AI', riskLevel: 'High-Risk', compliance: 65, status: 'Non-Complaint' },
        { id: '6', systemName: 'Loan Approval AI', riskLevel: 'High-Risk', compliance: 65, status: 'Non-Complaint' },
      ],
    };
  },
};

export const policyService = {
  getAll: async (): Promise<Policy[]> => {
    await delay(300);
    // In real app: return apiClient.get(API_ENDPOINTS.POLICIES).then(res => res.data)
    return [...dummyPolicies];
  },
  
  getById: async (id: string): Promise<Policy> => {
    await delay(200);
    // In real app: return apiClient.get(API_ENDPOINTS.POLICY_BY_ID(id)).then(res => res.data)
    const policy = dummyPolicies.find(p => p.id === id);
    if (!policy) throw new Error('Policy not found');
    return policy;
  },
  
  create: async (policy: Omit<Policy, 'id'>): Promise<Policy> => {
    await delay(400);
    // In real app: return apiClient.post(API_ENDPOINTS.POLICIES, policy).then(res => res.data)
    const newPolicy: Policy = { ...policy, id: String(dummyPolicies.length + 1) };
    dummyPolicies.push(newPolicy);
    return newPolicy;
  },
  
  update: async (id: string, policy: Partial<Policy>): Promise<Policy> => {
    await delay(400);
    // In real app: return apiClient.put(API_ENDPOINTS.POLICY_BY_ID(id), policy).then(res => res.data)
    const index = dummyPolicies.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Policy not found');
    dummyPolicies[index] = { ...dummyPolicies[index], ...policy };
    return dummyPolicies[index];
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(300);
    // In real app: return apiClient.delete(API_ENDPOINTS.POLICY_BY_ID(id))
    const index = dummyPolicies.findIndex(p => p.id === id);
    if (index !== -1) dummyPolicies.splice(index, 1);
  },
};

export const modelService = {
  getAll: async (): Promise<Model[]> => {
    await delay(300);
    // In real app: return apiClient.get(API_ENDPOINTS.MODELS).then(res => res.data)
    return [...dummyModels];
  },
  
  getById: async (id: string): Promise<Model> => {
    await delay(200);
    // In real app: return apiClient.get(API_ENDPOINTS.MODEL_BY_ID(id)).then(res => res.data)
    const model = dummyModels.find(m => m.id === id);
    if (!model) throw new Error('Model not found');
    return model;
  },
  
  create: async (model: Omit<Model, 'id'>): Promise<Model> => {
    await delay(400);
    // In real app: return apiClient.post(API_ENDPOINTS.MODELS, model).then(res => res.data)
    const newModel: Model = { ...model, id: String(dummyModels.length + 1) };
    dummyModels.push(newModel);
    return newModel;
  },
  
  update: async (id: string, model: Partial<Model>): Promise<Model> => {
    await delay(400);
    // In real app: return apiClient.put(API_ENDPOINTS.MODEL_BY_ID(id), model).then(res => res.data)
    const index = dummyModels.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Model not found');
    dummyModels[index] = { ...dummyModels[index], ...model };
    return dummyModels[index];
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(300);
    // In real app: return apiClient.delete(API_ENDPOINTS.MODEL_BY_ID(id))
    const index = dummyModels.findIndex(m => m.id === id);
    if (index !== -1) dummyModels.splice(index, 1);
  },
};

export const organizationService = {
  getAll: async (): Promise<Organization[]> => {
    await delay(300);
    // In real app: return apiClient.get(API_ENDPOINTS.ORGANIZATIONS).then(res => res.data)
    return [...dummyOrganizations];
  },
  
  getById: async (id: string): Promise<Organization> => {
    await delay(200);
    // In real app: return apiClient.get(API_ENDPOINTS.ORGANIZATION_BY_ID(id)).then(res => res.data)
    const org = dummyOrganizations.find(o => o.id === id);
    if (!org) throw new Error('Organization not found');
    return org;
  },
  
  create: async (organization: Omit<Organization, 'id'>): Promise<Organization> => {
    await delay(400);
    // In real app: return apiClient.post(API_ENDPOINTS.ORGANIZATIONS, organization).then(res => res.data)
    const newOrg: Organization = { ...organization, id: String(dummyOrganizations.length + 1) };
    dummyOrganizations.push(newOrg);
    return newOrg;
  },
  
  update: async (id: string, organization: Partial<Organization>): Promise<Organization> => {
    await delay(400);
    // In real app: return apiClient.put(API_ENDPOINTS.ORGANIZATION_BY_ID(id), organization).then(res => res.data)
    const index = dummyOrganizations.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Organization not found');
    dummyOrganizations[index] = { ...dummyOrganizations[index], ...organization };
    return dummyOrganizations[index];
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(300);
    // In real app: return apiClient.delete(API_ENDPOINTS.ORGANIZATION_BY_ID(id))
    const index = dummyOrganizations.findIndex(o => o.id === id);
    if (index !== -1) dummyOrganizations.splice(index, 1);
  },
};
