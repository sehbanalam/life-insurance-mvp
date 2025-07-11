// Defines allowed values for user risk tolerance input
export type RiskTolerance = 'Low' | 'Medium' | 'High';

// Describes the shape of input data submitted by the user
export interface SubmissionInput {
  age: number;              // User's age in years
  income: number;           // User's annual income
  dependents: number;       // Number of financial dependents
  risk_tolerance: RiskTolerance;  // Risk appetite (Low / Medium / High)
}

// Defines the structure of the insurance recommendation returned by the API
export interface Recommendation {
  recommendation: string;  // Suggested insurance product/plan
  explanation: string;     // Reasoning behind the recommendation
}
