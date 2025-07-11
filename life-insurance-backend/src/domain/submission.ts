export type RiskTolerance = 'Low' | 'Medium' | 'High';

export interface SubmissionInput {
  age: number;
  income: number;
  dependents: number;
  risk_tolerance: RiskTolerance;
}

export interface Recommendation {
  recommendation: string;
  explanation: string;
}
