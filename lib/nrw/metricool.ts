export type MetricoolDraftPayload = {
  postId: string;
  caption: string;
  mediaRef?: string;
  cta: string;
  hashtags: string[];
  scheduleDisabled: true;
  publishDisabled: true;
  approvalRequired: true;
};

export function buildMetricoolDraftPayload(input: {
  postId: string;
  caption: string;
  mediaRef?: string;
  hashtags?: string[];
}): MetricoolDraftPayload {
  return {
    postId: input.postId,
    caption: input.caption,
    mediaRef: input.mediaRef,
    cta: "Get My Free Estimate",
    hashtags: input.hashtags ?? ["#NashvilleResinWorx", "#EpoxyFlooring", "#DecorativeConcrete"],
    scheduleDisabled: true,
    publishDisabled: true,
    approvalRequired: true,
  };
}
