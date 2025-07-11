import { SubmissionInput, Recommendation } from '../domain/submission';

export function getRecommendation(input: SubmissionInput): Recommendation {
  const { age, income, dependents, risk_tolerance } = input;

  if (age < 40 && risk_tolerance === 'High') {
    return {
      recommendation: 'Term Life – $500,000 for 20 years',
      explanation: 'Young age and high risk suggests term coverage for flexibility and affordability.'
    };
  }

  if (dependents > 2 && income > 100000) {
    return {
      recommendation: 'Whole Life – $1,000,000',
      explanation: 'High income and many dependents indicate need for permanent protection.'
    };
  }

  return {
    recommendation: 'Term Life – $250,000 for 10 years',
    explanation: 'Standard coverage based on moderate profile.'
  };
}
