# NRW Auto Social Master Tracker Schema

Status: approval-controlled
Autonomous posting: disabled

## Purpose
This file defines the tabs, fields, and operating rules required for the Nashville Resin Worx Auto Social workflow.

## Master Tracker Tabs

1. CONTROL_STATUS
Fields: item_id, area, status, owner, last_update, next_action, blocker, approval_required

2. APPROVALS
Fields: approval_id, asset_id, content_id, requested_by, approval_type, status, approved_by, approved_at, notes

3. BLOCKERS
Fields: blocker_id, date_opened, area, description, severity, workaround, owner, status, date_closed

4. ASSET_MANIFEST
Fields: asset_id, asset_type, brand, avatar, file_name, drive_path, usage_rights, approval_status, notes

5. AVATAR_USAGE
Fields: usage_id, avatar, role, content_id, platform, scene, wardrobe, voice, approval_status, notes

6. DISCOVERY_LOG
Fields: discovery_id, date, source, platform, trend, keyword, hashtag, creator, url, notes, score

7. AUDIENCE_INSIGHTS
Fields: insight_id, date, audience_segment, desire, objection, question, trigger, source, notes

8. TOPIC_BACKLOG
Fields: topic_id, brand, bucket, hook, platform_priority, avatar, buyer_intent, attention_score, production_ease, total_score, status

9. SCRIPT_TRACKER
Fields: script_id, topic_id, avatar, hook, script_short, script_long, caption, cta, status, notes

10. PRODUCTION_QUEUE
Fields: production_id, script_id, asset_id, tool, format, status, editor, due_date, output_link

11. EDITING_QUEUE
Fields: edit_id, production_id, status, notes, revision_count, final_link

12. METRICOOL_QUEUE
Fields: schedule_id, content_id, platform, date, time, caption, media_link, link_url, approval_status, scheduled_status

13. PLATFORM_POSTS
Fields: post_id, platform, post_url, publish_date, content_id, avatar, bucket, campaign, status

14. KLAVIYO_TRACKER
Fields: flow_id, flow_name, trigger, segment, email_name, status, test_sent, approval_status, notes

15. LEAD_TRACKER
Fields: lead_id, source, platform, campaign, name, phone, email, project_type, square_feet, status, next_followup

16. SHOPIFY_CONTENT
Fields: product_id, product_name, content_id, xyla_status, video_link, approval_status, notes

17. ANALYTICS_LOG
Fields: analytics_id, post_id, platform, views, watch_time, likes, comments, shares, saves, clicks, leads, revenue, notes

18. WINNERS
Fields: winner_id, post_id, reason_won, metric_won, recreate_count, next_variation_1, next_variation_2, next_variation_3

19. LOSERS
Fields: loser_id, post_id, reason_lost, fix_or_kill, notes

20. NEXT_30_QUEUE
Fields: queue_id, source_winner, new_topic, avatar, bucket, priority, status

## Workflow
Discover -> Score -> Script -> Produce -> Edit -> Approve -> Schedule -> Publish -> Analyze -> Evolve.

## Safety
No row may move to scheduled_status=ready_to_publish unless approval_status=approved.
