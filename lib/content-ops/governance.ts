export const approvalGates = [
  "public_publishing",
  "paid_ads",
  "pricing_claims",
  "warranty_claims",
  "safety_claims",
  "customer_identity",
  "bulk_email_sms",
  "high_risk_replies"
] as const;

export type RiskLevel = "low" | "medium" | "high";

const highRiskPatterns = [
  /price|pricing|cost|warranty|guarantee/i,
  /certified|certification|safety|slip|chemical/i,
  /customer|testimonial|review|before and after/i
];

export function classifyContentRisk(copy: string): RiskLevel {
  if (highRiskPatterns.some((pattern) => pattern.test(copy))) {
    return "high";
  }

  if (/estimate|offer|discount|book|call|lead/i.test(copy)) {
    return "medium";
  }

  return "low";
}

export function requiresApproval(riskLevel: RiskLevel) {
  return riskLevel !== "low";
}
