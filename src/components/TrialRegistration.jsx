"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const initial = {
  name: "",
  role: "",
  email: "",
  employees: "",
  company: "",
  country: "",
  store_url: "",
  competitors: "",
  sku_count: "100-500",
  platform: "Shopify",
  website: "",
};

export default function TrialRegistration() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.documentElement.dataset.headerTone = "dark";
    return () => {
      document.documentElement.dataset.headerTone = "light";
    };
  }, []);

  const update = (event) => {
    setData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const next = (event) => {
    event.preventDefault();
    setStep(2);
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/trial-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      setStatus("sent");
      setStep(3);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Unable to send your request. Please try again.");
    }
  };

  return (
    <main className="trial-page" id="main" data-header-tone="dark">
      <div className="trial-grid" aria-live="polite">
        <section className="trial-intro">
          <span className="trial-eyebrow">UXHUB Pricing Super Intelligence</span>
          <h1>See the market move before it costs you a sale.</h1>
          <p>
            Start a 14-day trial of competitor price monitoring for GCC
            e-commerce. No credit card is required.
          </p>
          <div className="trial-points">
            <span>01 · Product matching</span>
            <span>02 · Price-change alerts</span>
            <span>03 · Historical pricing analytics</span>
          </div>
          <Link href="/product/price-intelligence">← Back to Price Intelligence</Link>
        </section>

        <section className="trial-card">
          {step < 3 && (
            <div className="trial-card-head">
              <div>
                <span>Trial request</span>
                <h2>{step === 1 ? "Tell us about your business" : "What should we monitor?"}</h2>
              </div>
              <strong>{String(step).padStart(2, "0")} / 02</strong>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={next} className="trial-form">
              <Field label="Name" name="name" value={data.name} onChange={update} required autoComplete="name" />
              <Field label="Business email" name="email" type="email" value={data.email} onChange={update} required autoComplete="email" />
              <Field label="Company / business" name="company" value={data.company} onChange={update} required autoComplete="organization" />
              <Field label="Country" name="country" value={data.country} onChange={update} autoComplete="country-name" />
              <Select label="Company role" name="role" value={data.role} onChange={update} options={["C-Level / Executive", "Pricing Analyst", "E-commerce Manager", "Category Manager", "Marketing / Sales", "Other"]} />
              <Select label="Number of employees" name="employees" value={data.employees} onChange={update} required options={["1-10", "11-50", "51-200", "201-500", "500+"]} />
              <input className="trial-honeypot" tabIndex="-1" autoComplete="off" name="website" value={data.website} onChange={update} aria-hidden="true" />
              <button className="trial-primary" type="submit">Continue →</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submit} className="trial-form">
              <Field className="trial-wide" label="Your store URL" name="store_url" type="url" value={data.store_url} onChange={update} placeholder="https://yourstore.com" required />
              <Field className="trial-wide" label="Competitor websites to monitor" name="competitors" value={data.competitors} onChange={update} placeholder="amazon.sa, noon.com" />
              <Select label="Number of products / SKUs" name="sku_count" value={data.sku_count} onChange={update} options={["100-500", "500-2500", "2500-10000", "10000+"]} />
              <Select label="E-commerce platform" name="platform" value={data.platform} onChange={update} options={["Shopify", "Magento", "WooCommerce", "Custom / API"]} />
              <label className="trial-consent trial-wide">
                <input type="checkbox" required />
                <span>I agree to the Terms of Service and 14-day trial terms.</span>
              </label>
              {message && <p className="trial-error trial-wide" role="alert">{message}</p>}
              <div className="trial-actions trial-wide">
                <button type="button" onClick={() => setStep(1)}>← Back</button>
                <button className="trial-primary" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Start 14-day trial →"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="trial-success">
              <span>Request transmitted</span>
              <h2>Thank you.</h2>
              <p>Your trial request was sent to the UX Hub team. They will contact you at your business email with the next steps.</p>
              <Link href="/product/price-intelligence">Return to Price Intelligence →</Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({ label, className = "", ...props }) {
  return (
    <label className={`trial-field ${className}`}>
      <span>{label}{props.required && " *"}</span>
      <input {...props} />
    </label>
  );
}

function Select({ label, options, ...props }) {
  return (
    <label className="trial-field">
      <span>{label}{props.required && " *"}</span>
      <select {...props}>
        <option value="">Select</option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
    </label>
  );
}
