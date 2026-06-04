import Link from "next/link";

export default function EstimateErrorPage() {
  return (
    <main className="status-page">
      <p className="eyebrow">Estimate intake</p>
      <h1>We could not save that request.</h1>
      <p className="hero-copy">
        Please try again in a moment, or contact Nashville Resin Worx directly so the project details are not lost.
      </p>
      <Link className="estimate-button" href="/#estimate">
        Back to Estimate
      </Link>
    </main>
  );
}
