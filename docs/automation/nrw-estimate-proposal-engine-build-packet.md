# Nashville Resin Worx Estimate Proposal Engine Build Packet

## 1. Current Status

The Nashville Resin Worx website has a restored homepage layout with a phone-first estimate form, optional image uploads, and Google Drive photo upload support. The latest frontend patch adds prominent visual cues for the 15% coupon and phone photo upload area without rebuilding the homepage layout.

The requested next system is an automated proposal engine that receives customer estimate form submissions, saves photos, routes the lead to the operator, creates a branded takeoff/proposal package, prepares the customer email, and waits for operator approval before sending anything public-facing.

## 2. Source Truth

Verified sources from the current runtime:

- Production site: `https://nashvilleresinworx-strategic-minds-advisory.vercel.app`
- Site repository: `Strategic-Minds/NASHVILLERESINWORX`
- Vercel project: `nashvilleresinworx`
- Lead email requested by operator: `info@epoxywillchangeyourlife.com`
- Shop location context requested by operator: Nashville, Tennessee
- Existing estimate upload Drive folder ID: `15wlZy0-oN0aDML4hoOERGhPVe4pVwD5X`
- Drive contains a `NASHVILLE RESIN WORX` folder and an asset library folder.
- Drive contains `AUTO BUILDER DOCS`, `06_TECH_AUTOMATION`, `03_PRODUCTS_AND_SALES`, and `02_SERVICES` folders.
- Site service categories currently visible on `/services`: Metallic Epoxy, Flake Systems, Concrete Staining, Polished Concrete, Countertops, River Tables, Decorative Concrete, Stone Surfaces.
- Site color chart page points to the Torginol visualizer: `https://torginol.com/design`.
- AUTO BUILDER 2 reports Google Drive as a partial-readiness connector with folder/doc mutation intended through bridge jobs.
- AUTO BUILDER 2 reports Playwright/browser verification as ready in its capability matrix.

Could not verify yet:

- Exact logo file to use inside Drive asset library.
- Exact warranty language Nashville Resin Worx wants legally approved.
- Final pricing rules, square-foot pricing, prep modifiers, travel rules, tax rules, or minimum project charge.
- Whether Google Drive document creation is directly executable from the current chat surface. Repo docs are the fallback receipt mode.

## 3. System Boundary

This engine must produce draft work product, not automatically bind Nashville Resin Worx to a price or warranty commitment without review.

Included:

- Customer form intake.
- Photo upload storage.
- Operator notification.
- Lead enrichment.
- Photo quality check.
- Measurement parsing.
- Preliminary takeoff calculation.
- GPT-generated professional scope language.
- Branded proposal PDF or Google Doc draft.
- Cropped/annotated customer photos with measurement overlays where possible.
- Customer email draft with name, address, proposal link, estimate validity, and warranty section.
- Operator approval gate before sending proposal/email.

Excluded until explicitly approved:

- Automatic customer email send without review.
- Binding final price generation without pricing table approval.
- Legal warranty changes.
- Public sharing of customer photos.
- Any paid API expansion beyond configured budget rules.

## 4. Frontend Plan

Immediate visible improvements already queued:

- Add `public/images/estimate-upload-phone.svg` to visually explain phone photo upload.
- Add `public/images/estimate-coupon-proposal.svg` to make the 15% coupon feel like the entry into the estimate workflow.
- Inject upload/coupon callouts through `EstimateFormEnhancer` to preserve the restored homepage layout.
- Show selected photo count and file names after the customer taps upload.

Next frontend build steps:

- Add richer estimate fields while keeping the layout compact:
  - Number of rooms.
  - Size of each room.
  - Total square feet.
  - New or old concrete.
  - Current floor material: wood, tile, carpet, VCT, bare concrete, existing coating, other.
  - Desired finish or need suggestions.
  - Existing floor photos.
  - Inspiration photos.
  - Desired start date.
  - Project address.
  - Selected color from color charts.
- Add fine print:
  - Bad photos may prevent a photo-based estimate from being completed accurately.
  - Customer can still submit the estimate without images.
  - Estimates are valid for 15 days.
  - Online estimates apply to jobs within one hour of the Nashville shop location.
  - Estimates are typically provided within 48 hours.
- Add color chart picker integration:
  - Let the customer click a color chip or visualizer selection and store the chosen color in the estimate payload.
  - Preserve link to Torginol visualizer.

## 5. Backend Plan

### Intake Route

Current route: `POST /api/leads`.

Required enhancements:

- Normalize form fields into a structured `estimate_intake` record.
- Save uploaded photos into customer-specific Drive folders.
- Add photo metadata to the lead record:
  - Original filename.
  - Drive URL.
  - File size.
  - Field type: existing floor or inspiration photo.
  - Upload status.
- Create proposal generation job with status `queued`.
- Send operator notification after lead save.

### Data Model

Recommended tables or structured records:

- `nrw_leads`: existing lead record.
- `nrw_estimate_intakes`: rooms, measurements, floor condition, address, desired finish, color choices.
- `nrw_estimate_photos`: Drive links, photo quality status, crop/annotation status.
- `nrw_proposal_jobs`: queued/running/draft_ready/approved/sent/failed.
- `nrw_proposals`: proposal document link, PDF link, total, scope, warranty text, email draft.
- `nrw_operator_notifications`: delivery receipts and acknowledgement state.

### Proposal Generation Pipeline

1. Intake received.
2. Photos saved to Drive.
3. Operator notification sent.
4. AI quality check reviews photos for usefulness.
5. Measurement parser extracts room dimensions and total square feet.
6. Takeoff calculator builds draft quantities:
   - Total square feet.
   - Prep area.
   - Coating layers by system type.
   - Crack repair / patch allowances if mentioned or visible.
   - Photo confidence level.
7. GPT service-language agent writes professional specs from verified site service categories.
8. Image processor crops uploaded photos and adds measurement overlays when measurements are known.
9. Proposal renderer builds branded Google Doc and PDF.
10. Email draft created.
11. Operator approval required.
12. Approved email can be sent to customer.

## 6. Repo And File Map

Website repo files already touched:

- `app/components/EstimateFormEnhancer.tsx`
- `public/images/estimate-upload-phone.svg`
- `public/images/estimate-coupon-proposal.svg`
- `lib/google-drive.ts`
- `lib/leads.ts`
- `app/api/leads/route.ts`

Recommended new files:

- `app/api/proposals/queue/route.ts`
- `app/api/proposals/[id]/approve/route.ts`
- `lib/proposals/proposal-job.ts`
- `lib/proposals/takeoff.ts`
- `lib/proposals/photo-quality.ts`
- `lib/proposals/photo-annotation.ts`
- `lib/proposals/proposal-renderer.ts`
- `lib/proposals/customer-email.ts`
- `lib/proposals/service-specs.ts`
- `lib/proposals/warranty.ts`
- `lib/notifications/operator.ts`
- `docs/automation/nrw-estimate-proposal-engine-build-packet.md`

AUTO BUILDER repo/bridge targets:

- `run_drive_job`: create customer folder, upload generated proposal PDF, write receipt.
- `drive_create_folder`: create per-lead Drive folder.
- `drive_upload_file`: upload PDF and annotated images.
- `drive_write_receipt`: write generation and approval receipts.
- `run_browser_job`: browser verification of form/upload flow.
- `run_universal_job`: proposal generation worker if exposed by AUTO BUILDER 2.

## 7. Tool And Integration Plan

### Google Drive

Drive folder structure per estimate:

```text
NASHVILLE RESIN WORX/
  06_TECH_AUTOMATION/
    Estimate Proposal Engine/
      Incoming Leads/
      Draft Proposals/
      Approved Proposals/
      Sent Proposals/
      Receipts/
  Customer Estimates/
    YYYY-MM-DD - Customer Name - Address/
      01 Intake Form.json
      02 Uploaded Photos/
      03 Cropped Annotated Photos/
      04 Takeoff.json
      05 Proposal Draft.docx or Google Doc
      06 Proposal PDF.pdf
      07 Customer Email Draft.txt
      08 Approval Receipt.json
```

### GPT / AI

Use separate roles:

- Intake Summarizer: clean customer info and missing fields.
- Photo Quality Agent: mark useful/blurry/incomplete photos.
- Takeoff Agent: use measurements, not hallucinated dimensions.
- Spec Writer Agent: write system-specific floor scope using verified service category language.
- Proposal Writer Agent: assemble branded, professional proposal.
- Email Writer Agent: write customer-facing email.
- Governance Agent: block sending until operator approves.

### Browser / Site Language

The service language agent should use browser/site fetch against:

- `/services`
- `/color-charts`
- `/gallery`
- homepage service sections

Professional language must be grounded in verified categories. If the site content is thin, the system may write polished generic category language but must mark it as generated service copy pending operator approval.

### Email

Outbound email must be draft-first until approved.

Required email fields:

- Customer first name.
- Project address.
- Thank-you note.
- Proposal PDF link or attachment.
- Summary of selected floor system.
- Takeoff summary.
- Estimate validity: 15 days.
- Warranty section.
- Call-to-action to approve/schedule.

### Warranty

Warranty content must be operator-approved. Until final warranty terms are supplied, proposal must use a placeholder section:

`Warranty: Nashville Resin Worx will provide warranty terms in the final approved proposal. Warranty coverage depends on floor condition, preparation requirements, selected system, moisture conditions, and approved scope.`

## 8. Validation Plan

Frontend validation:

- Visit production homepage.
- Tap 15% coupon and confirm estimate form scroll/focus.
- Tap upload box on mobile and confirm image picker opens.
- Select one or more images and confirm selected count appears.
- Submit a dry-run with image and confirm no layout break.

Backend validation:

- Submit JSON-only test lead.
- Submit multipart lead with one test image.
- Confirm Drive folder creation.
- Confirm image file URL appears in lead notes.
- Confirm missing/bad images do not block submission unless `NRW_REQUIRE_DRIVE_UPLOADS=true`.

Proposal validation:

- Generate draft takeoff from known sample measurements.
- Confirm no unsupported measurements are invented.
- Confirm proposal includes logo, customer name, address, project type, scope, takeoff, photos, warranty section, estimate validity, and operator approval status.
- Confirm annotated photos show only measurements supplied by the customer or manually confirmed.
- Confirm email is draft-only until approved.

Release validation:

- Vercel preview first.
- Browser screenshot evidence.
- One controlled dry-run using a test lead.
- Operator approval before production enabling of auto-send.

## 9. Required Docs And Playbooks

Required docs to create in Drive once Drive-write tooling is available:

- `NRW Proposal Engine Operating Guide`
- `NRW Proposal Template`
- `NRW Warranty Language - Pending Legal/Operator Approval`
- `NRW Pricing Rules and Takeoff Multipliers`
- `NRW Operator Approval Checklist`
- `NRW Customer Email Templates`
- `NRW Photo Quality Standards`

## 10. Blockers Or Missing Pieces

Critical blockers:

- Final warranty wording is not verified.
- Pricing/takeoff formulas are not verified.
- Direct Drive-write tool is not surfaced in this chat; AUTO BUILDER 2 indicates Drive job tools exist, but this run only exposed Drive read/list/search.
- Exact logo asset path in Drive is not verified yet.
- Production auto-send must remain gated until tested.

Operational blockers:

- If customer photos do not include usable angles, GPT must not invent measurements.
- If customer measurements conflict with photos, proposal must require operator review.
- If service category is not supported or is outside one-hour range, the proposal should route to manual review.

## 11. Next Best Prompt

`AUTO BUILDER 2, execute the Nashville Resin Worx Estimate Proposal Engine sandbox build from docs/automation/nrw-estimate-proposal-engine-build-packet.md. Create the Drive folder structure under the NASHVILLE RESIN WORX Drive folder, verify the logo asset, generate the proposal/warranty/email templates as drafts, and run a dry-run lead with one uploaded image. Do not send customer emails or publish final proposals until operator approval.`
