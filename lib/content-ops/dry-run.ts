import { classifyContentRisk, requiresApproval } from "./governance";

const serviceAngles = [
  "garage floor epoxy prep mistakes Nashville homeowners can avoid",
  "metallic epoxy design ideas for premium residential spaces",
  "flake floor systems for garages, shops, and utility rooms",
  "concrete staining options for decorative interior surfaces",
  "river table and custom surface project inspiration"
];

const platforms = ["Facebook", "Instagram", "Threads", "YouTube Shorts", "TikTok", "X", "LinkedIn", "Pinterest"];

export function generateDryRunContentQueue(now = new Date()) {
  const posts = serviceAngles.flatMap((topic, index) => {
    const copy = `Nashville Resin Worx content draft: ${topic}. CTA: open the free estimate form when you are ready to plan a surface project.`;
    const riskLevel = classifyContentRisk(copy);

    return platforms.slice(0, 3).map((platform, platformIndex) => ({
      id: `dry-post-${index + 1}-${platformIndex + 1}`,
      platform,
      status: requiresApproval(riskLevel) ? "approval_required" : "draft",
      riskLevel,
      copy,
      cta: "Get My Free Estimate",
      assetIds: [],
      approvalRequired: requiresApproval(riskLevel),
      scheduledFor: new Date(now.getTime() + (index * 3 + platformIndex + 1) * 60 * 60 * 1000).toISOString(),
      trackingId: `nrw-dry-${index + 1}-${platform.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    }));
  });

  const missingAssets = [
    "01_Hero_Collages",
    "03_Gallery_Portfolio",
    "04_Process_Images",
    "05_Product_Images"
  ];

  return {
    mode: "dry_run_until_approved",
    generatedAt: now.toISOString(),
    posts,
    approvalRequests: posts
      .filter((post) => post.approvalRequired)
      .map((post) => ({
        subjectType: "content_post",
        subjectId: post.id,
        riskLevel: post.riskLevel,
        reason: "Draft contains CTA or claims requiring operator review before publishing."
      })),
    missingAssets,
    blockedActions: ["public_publishing", "paid_ads", "bulk_email_sms", "production_mutation"]
  };
}

export function generateDailyDigest(now = new Date()) {
  const queue = generateDryRunContentQueue(now);

  return {
    digestDate: now.toISOString().slice(0, 10),
    wins: ["Dry-run content queue generated without publishing."],
    blockers: [
      "Approved Drive image folders still need real NRW assets.",
      "Browser QA requires a Playwright-capable runtime.",
      "Live lead QA requires outbound POST access."
    ],
    nextPosts: queue.posts.slice(0, 5),
    leadSignals: [],
    recommendations: [
      "Populate approved Drive image folders before visual content integration.",
      "Review approval-required drafts before enabling platform publishing.",
      "Run lead-form QA from a POST-capable runtime before launch."
    ]
  };
}
