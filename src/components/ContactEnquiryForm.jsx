"use client";
import { useState } from "react";

const empty = { name: "", company: "", email: "", phone: "", location: "", scope: "", brief: "" };

export default function ContactEnquiryForm() {
  const [data, setData] = useState(empty);
  const [sent, setSent] = useState(false);
  const update = (event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }));
  if (sent) return <div className="contact-enquiry-success" role="status"><strong>Enquiry received.</strong><span>Thank you. The UX Hub team will get back to you shortly.</span><button type="button" className="contact-enquiry-reset" onClick={() => setSent(false)}>Send another enquiry</button></div>;
  return <form className="contact-enquiry-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
    <div className="contact-enquiry-grid">
      <label>Name<input name="name" value={data.name} onChange={update} placeholder="Your full name" required /></label>
      <label>Company<input name="company" value={data.company} onChange={update} placeholder="Company or organization" required /></label>
      <label>Work Email<input type="email" name="email" value={data.email} onChange={update} placeholder="name@company.com" required /></label>
      <label>Phone<input name="phone" value={data.phone} onChange={update} placeholder="+91 / +966 number" /></label>
    </div>
    <label>Country / Location<input name="location" value={data.location} onChange={update} placeholder="India, Saudi Arabia, UAE, Global..." required /></label>
    <label>Requirement Scope
      <div className="contact-enquiry-select-wrap">
        <select name="scope" value={data.scope} onChange={update} required>
          <option value="">Select a practice or requirement</option>
          <option>Product Growth (0→1 Strategy)</option>
          <option>E-commerce Growth (Scaling &amp; CRO)</option>
          <option>Digital Experience (Web &amp; Platform)</option>
          <option>Venture Launch &amp; GTM</option>
          <option>Digital Transformation</option>
          <option>Other Advisory</option>
        </select>
        <svg className="contact-enquiry-select-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
    <label>Project Brief<textarea name="brief" value={data.brief} onChange={update} placeholder="Share the opportunity, challenge, timeline or growth targets." rows="4" required /></label>
    <p className="contact-enquiry-note">Data transmission secured. No client data is shared with external parties.</p>
    <button type="submit" className="wipe-button-module__-tlSna__root disclosure-list-module__SPVnsG__link contact-enquiry-submit"><span className="wipe-button-module__-tlSna__content"><span className="text-module__DYGPWq__root text-module__DYGPWq__body-large text-module__DYGPWq__weight-medium">Transmit Enquiry</span><span aria-hidden="true">↗</span></span></button>
  </form>;
}
