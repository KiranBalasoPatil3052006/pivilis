"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export function ContactForm() {
  const [service, setService] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("service");
    if (value && services.some((s) => s.title === value)) {
      queueMicrotask(() => setService(value));
    }
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not send your message.");
      setStatus("success");
      form.reset();
      setService("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate={false}>
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input name="website" id="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "success" && (
        <p className="form-status success" role="status">
          Your message has been received. Thank you for telling us about your project.
        </p>
      )}

      {status === "error" && (
        <p className="form-status error" role="alert">
          {error}
        </p>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Your name *</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email address *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="business">Business name</label>
          <input
            id="business"
            name="business"
            maxLength={120}
            autoComplete="organization"
            placeholder="If you have one"
          />
        </div>
        <div className="field">
          <label htmlFor="service">What do you need help with?</label>
          <select
            id="service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">I’m not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Tell us about your goal or challenge *</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={15}
          maxLength={3000}
          placeholder="What is your business trying to do, and where do you need help?"
        />
      </div>

      <p className="form-note">
        We use these details to understand your enquiry and respond. Please do not include sensitive personal information.
      </p>

      <button
        className="button button-primary"
        type="submit"
        disabled={status === "sending"}
        style={{ marginTop: 14 }}
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
        <ArrowRight />
      </button>
    </form>
  );
}

