// Import domain types for input validation and output structure
import { SubmissionInput, Recommendation } from '../domain/submission';

/**
 * Determines a life insurance recommendation based on user profile data.
 * This is a simple, rule-based engine designed to be easily extended or replaced with ML later.
 */
export function getRecommendation(input: SubmissionInput): Recommendation {
  const { age, income, dependents, risk_tolerance } = input;

  // --- Case 1: Young user with high risk tolerance ---
  if (age < 40 && risk_tolerance === 'High') {
    return {
      recommendation: 'Term Life – $750,000 for 30 years',
      explanation: 'Young and high-risk profile benefits from long-term, high-value term coverage.'
    };
  }

  // --- Case 1b: Young user with low risk tolerance ---
  if (age < 40 && risk_tolerance === 'Low') {
    return {
      recommendation: 'Term Life – $250,000 for 20 years',
      explanation: 'Young age with low risk suggests basic, affordable coverage.'
    };
  }

  // --- Case 2: High income and many dependents ---
  if (dependents >= 3 && income > 100000) {
    return {
      recommendation: 'Whole Life – $1,500,000',
      explanation: 'High income and multiple dependents justify a long-term safety net.'
    };
  }

  // --- Case 2b: Low/mid income but many dependents ---
  if (dependents >= 3 && income <= 100000) {
    return {
      recommendation: 'Term Life – $500,000 for 20 years',
      explanation: 'Many dependents require affordable but sufficient protection.'
    };
  }

  // --- Case 3: Older clients with medium risk ---
  if (age >= 50 && risk_tolerance === 'Medium') {
    return {
      recommendation: 'Whole Life – $750,000',
      explanation: 'Older age and moderate risk benefits from permanent coverage.'
    };
  }

  // --- Case 3b: Retired/near-retirement age with low risk ---
  if (age >= 60 && risk_tolerance === 'Low') {
    return {
      recommendation: 'Guaranteed Universal Life – $500,000',
      explanation: 'Lower risk in retirement age calls for stable lifetime protection.'
    };
  }

  // --- Case 4: No dependents and low income ---
  if (dependents === 0 && income < 50000) {
    return {
      recommendation: 'Term Life – $100,000 for 10 years',
      explanation: 'Minimal dependents and income suggest basic coverage for debt or final expenses.'
    };
  }

  // --- Fallback: general-purpose recommendation ---
  return {
    recommendation: 'Term Life – $250,000 for 10 years',
    explanation: 'Standard recommendation for balanced risk and needs.'
  };
}
