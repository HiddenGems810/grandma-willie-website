"use client";

import { useState, useId } from "react";
import { CheckCircle, Loader, AlertCircle, Mail, Check, ArrowRight } from "lucide-react";
import { grandmaWillieContent } from "@/content/grandma-willie";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type FormState = "idle" | "submitting" | "success" | "error";

type FormData = {
  name: string;
  contact: string;
  inquiryType: string;
  message: string;
  preferredContact: string;
  // Honeypot field — must stay empty
  website: string;
};

type FormErrors = Partial<Record<Exclude<keyof FormData, "website">, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  const contactTrimmed = data.contact.trim();
  if (!contactTrimmed) {
    errors.contact = "An email or phone number is required.";
  } else if (
    contactTrimmed.includes("@") &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactTrimmed)
  ) {
    errors.contact = "Please enter a valid email address.";
  } else if (
    !contactTrimmed.includes("@") &&
    contactTrimmed.replace(/\D/g, "").length < 7
  ) {
    errors.contact = "Please enter a valid phone number or email.";
  }

  if (!data.inquiryType) {
    errors.inquiryType = "Please select an inquiry type.";
  }

  const messageTrimmed = data.message.trim();
  if (!messageTrimmed) {
    errors.message = "A message is required.";
  } else if (messageTrimmed.length < 10) {
    errors.message = "Please add a bit more detail (at least 10 characters).";
  }

  return errors;
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[0.88rem] font-black text-[var(--color-cast-iron)]"
    >
      {children}
    </label>
  );
}

export function ContactSection() {
  const uid = useId();
  const { contact, contactOptions } = grandmaWillieContent;
  const sectionRef = useScrollReveal();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    inquiryType: "",
    message: "",
    preferredContact: "",
    website: "", // honeypot
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  function handleValidation(data: FormData) {
    const validationErrors = validate(data);
    setErrors(validationErrors);
    return validationErrors;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name as keyof FormData]) {
      handleValidation(updated);
    }
  }

  function handleBlur(name: keyof FormData) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    handleValidation(formData);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot check — bots will fill this hidden field
    if (formData.website) return;

    const allTouched: typeof touched = {
      name: true,
      contact: true,
      inquiryType: true,
      message: true,
    };
    setTouched(allTouched);

    const validationErrors = handleValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.keys(validationErrors)[0];
      document.getElementById(`${uid}-${firstError}`)?.focus();
      return;
    }

    setFormState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          inquiryType: formData.inquiryType,
          message: formData.message,
          preferredContact: formData.preferredContact,
        }),
      });
      if (!res.ok) {
        setFormState("error");
        return;
      }
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  function getFieldClasses(fieldName: keyof FormData, isTextarea = false) {
    const base = `form-input mt-1.5 block w-full rounded-xl border bg-[var(--color-paper)] px-4 text-[1rem] font-medium text-[var(--color-cast-iron)] outline-none placeholder:text-[var(--color-muted)] placeholder:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${isTextarea ? "py-3 min-h-[130px] resize-y" : "min-h-[50px]"}`;

    const isTouched = touched[fieldName];
    const hasError = !!errors[fieldName as keyof FormErrors];

    if (!isTouched) {
      return `${base} border-[var(--color-border-dark)] focus:border-[var(--color-tomato)] focus:ring-3 focus:ring-[var(--color-gold-soft)] focus:bg-white`;
    }
    if (hasError) {
      return `${base} border-[var(--color-tomato)] focus:border-[var(--color-tomato)] focus:ring-3 focus:ring-[color-mix(in_srgb,var(--color-tomato)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-tomato)_3%,white)]`;
    }
    return `${base} border-[var(--color-leaf)] focus:border-[var(--color-leaf)] focus:ring-3 focus:ring-[color-mix(in_srgb,var(--color-leaf)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-leaf)_3%,white)]`;
  }

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden px-5 py-[var(--section-y-md)] sm:px-8 lg:px-12"
      style={{ background: "var(--color-cream)" }}
      aria-labelledby="contact-heading"
    >
      {/* Top rule */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--color-border-dark)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[var(--container)]">

        {/* Section header */}
        <div data-reveal>
          <p className="text-[0.72rem] font-black uppercase tracking-[0.26em] text-[var(--color-tomato)]">
            {contact.eyebrow}
          </p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="contact-heading"
              className="max-w-[22ch] leading-[0.92] text-[var(--color-cast-iron)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              }}
            >
              {contact.headline}
            </h2>
            <p className="max-w-[44ch] text-[1.02rem] leading-[1.75] text-[var(--color-warm-brown)] lg:text-right">
              {contact.body}
            </p>
          </div>
        </div>

        <div
          data-reveal="scale"
          className="reveal-delay-1 mt-10 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start"
        >

          {/* ── Left info panel ── */}
          <div
            className="relative overflow-hidden rounded-[var(--radius-card)] p-8 text-white shadow-[var(--shadow-card)] border border-[var(--color-tomato-dark)] card-lift"
            style={{ background: "var(--color-tomato)" }}
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[28px] border-white opacity-10"
              aria-hidden="true"
            />
            <Mail size={32} aria-hidden="true" />
            <h3
              className="mt-6 text-2xl font-black leading-tight sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {contact.leftPanel.title}
            </h3>
            <p className="mt-4 text-[0.95rem] leading-[1.75] text-white/90">
              {contact.leftPanel.body}
            </p>

            {/* Use cases */}
            <ul className="mt-6 space-y-3" aria-label="Contact use cases">
              {contact.leftPanel.useCases.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[0.9rem] font-semibold text-white"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-tomato)]"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Response time note */}
            <div className="mt-8 rounded-xl border border-white/20 bg-white/12 p-4 backdrop-blur-sm">
              <span className="block text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--color-gold)] mb-1">
                Response Time
              </span>
              <p className="text-[0.88rem] font-semibold text-white/95">
                {contact.leftPanel.responseNote}
              </p>
            </div>

            {/* Direct links at bottom */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/15 pt-6">
              <a
                href={grandmaWillieContent.socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok @will46shelby (opens in new tab)"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[0.78rem] font-black text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                TikTok
                <ArrowRight size={12} aria-hidden="true" />
              </a>
              <a
                href={grandmaWillieContent.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram @grandmawillie184 (opens in new tab)"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[0.78rem] font-black text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                Instagram
                <ArrowRight size={12} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ── Form / Success ── */}
          {formState === "success" ? (
            <div
              className="flex flex-col items-center justify-center gap-5 rounded-[var(--radius-card)] bg-white p-12 text-center shadow-[var(--shadow-card)] ring-1 ring-[var(--color-border)] border-2 border-[var(--color-leaf)] motion-safe:animate-[formSuccess_0.4s_ease-out_both]"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <CheckCircle
                size={60}
                className="text-[var(--color-leaf)]"
                style={{ animation: "scaleUp 0.5s ease-out both" }}
                aria-hidden="true"
              />
              <div>
                <p
                  className="text-3xl font-black text-[var(--color-cast-iron)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Inquiry Sent!
                </p>
                <p className="mt-3 max-w-[36ch] text-[1.02rem] leading-[1.75] text-[var(--color-warm-brown)]">
                  Thank you for reaching out. Grandma Willie&apos;s team will review your message and get back to you within 2–3 business days.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Booking and contact form for Grandma Willie"
              className="grid gap-5 rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-[var(--color-border)] sm:p-9"
            >
              {/* Error alert */}
              {formState === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-tomato)]/30 bg-[color-mix(in_srgb,var(--color-tomato)_7%,white)] p-4 text-sm text-[var(--color-tomato)]"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="font-bold">
                    Something went wrong — please try again or reach out directly on TikTok or Instagram.
                  </p>
                </div>
              )}

              {/* Honeypot field — visually hidden, bots fill it, we reject if filled */}
              <div aria-hidden="true" style={{ display: "none" }}>
                <label htmlFor={`${uid}-website`}>Website</label>
                <input
                  id={`${uid}-website`}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              {/* Name */}
              <div>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={`${uid}-name`}>
                    Your name <span aria-hidden="true" className="text-[var(--color-tomato)]">*</span>
                  </FieldLabel>
                  {touched.name && !errors.name && (
                    <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[var(--color-leaf)]" aria-hidden="true">
                      <Check size={11} strokeWidth={3} /> Done
                    </span>
                  )}
                </div>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  disabled={formState === "submitting"}
                  aria-required="true"
                  aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                  aria-invalid={!!errors.name}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  placeholder="Your full name"
                  className={getFieldClasses("name")}
                />
                {touched.name && errors.name && (
                  <p id={`${uid}-name-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--color-tomato)]">
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email / Phone */}
              <div>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={`${uid}-contact`}>
                    Email or phone <span aria-hidden="true" className="text-[var(--color-tomato)]">*</span>
                  </FieldLabel>
                  {touched.contact && !errors.contact && (
                    <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[var(--color-leaf)]" aria-hidden="true">
                      <Check size={11} strokeWidth={3} /> Perfect
                    </span>
                  )}
                </div>
                <input
                  id={`${uid}-contact`}
                  name="contact"
                  type="text"
                  autoComplete="email"
                  required
                  disabled={formState === "submitting"}
                  aria-required="true"
                  aria-describedby={errors.contact ? `${uid}-contact-error` : undefined}
                  aria-invalid={!!errors.contact}
                  value={formData.contact}
                  onChange={handleChange}
                  onBlur={() => handleBlur("contact")}
                  placeholder="your@email.com or phone number"
                  className={getFieldClasses("contact")}
                />
                {touched.contact && errors.contact && (
                  <p id={`${uid}-contact-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--color-tomato)]">
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.contact}
                  </p>
                )}
              </div>

              {/* Inquiry type */}
              <div>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={`${uid}-inquiryType`}>
                    What&apos;s this about? <span aria-hidden="true" className="text-[var(--color-tomato)]">*</span>
                  </FieldLabel>
                  {touched.inquiryType && !errors.inquiryType && (
                    <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[var(--color-leaf)]" aria-hidden="true">
                      <Check size={11} strokeWidth={3} /> Got it
                    </span>
                  )}
                </div>
                <select
                  id={`${uid}-inquiryType`}
                  name="inquiryType"
                  required
                  disabled={formState === "submitting"}
                  aria-required="true"
                  aria-describedby={errors.inquiryType ? `${uid}-inquiryType-error` : undefined}
                  aria-invalid={!!errors.inquiryType}
                  value={formData.inquiryType}
                  onChange={handleChange}
                  onBlur={() => handleBlur("inquiryType")}
                  className={getFieldClasses("inquiryType")}
                >
                  <option value="" disabled>Select inquiry type…</option>
                  {contactOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {touched.inquiryType && errors.inquiryType && (
                  <p id={`${uid}-inquiryType-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--color-tomato)]">
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.inquiryType}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={`${uid}-message`}>
                    Your message <span aria-hidden="true" className="text-[var(--color-tomato)]">*</span>
                  </FieldLabel>
                  {touched.message && !errors.message && (
                    <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[var(--color-leaf)]" aria-hidden="true">
                      <Check size={11} strokeWidth={3} /> Looks great
                    </span>
                  )}
                </div>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={5}
                  required
                  disabled={formState === "submitting"}
                  aria-required="true"
                  aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                  aria-invalid={!!errors.message}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  placeholder="Tell us a bit about what you have in mind — a collaboration idea, a booking date, a question…"
                  className={getFieldClasses("message", true)}
                />
                {touched.message && errors.message && (
                  <p id={`${uid}-message-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--color-tomato)]">
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Preferred contact method (optional) */}
              <div>
                <FieldLabel htmlFor={`${uid}-preferredContact`}>
                  Preferred contact method{" "}
                  <span className="font-medium text-[var(--color-muted)] normal-case text-xs ml-1">(optional)</span>
                </FieldLabel>
                <input
                  id={`${uid}-preferredContact`}
                  name="preferredContact"
                  type="text"
                  disabled={formState === "submitting"}
                  value={formData.preferredContact}
                  onChange={handleChange}
                  placeholder="Email, phone call, text…"
                  className="form-input mt-1.5 block w-full min-h-[50px] rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-paper)] px-4 text-[1rem] font-medium text-[var(--color-cast-iron)] outline-none placeholder:text-[var(--color-muted)] placeholder:opacity-50 transition focus:border-[var(--color-tomato)] focus:ring-3 focus:ring-[var(--color-gold-soft)] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Privacy note */}
              <p className="text-[0.75rem] text-[var(--color-muted)] leading-[1.6]">
                Your information is kept private and only used to respond to your inquiry.
              </p>

              {/* Submit button */}
              <button
                type="submit"
                disabled={formState === "submitting"}
                aria-live="polite"
                className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full bg-[var(--color-cast-iron)] px-8 text-base font-black text-[var(--color-cream)] shadow-[0_14px_36px_rgba(20,11,7,0.28)] transition-all duration-250 hover:-translate-y-1 hover:bg-[var(--color-tomato)] hover:shadow-[0_20px_48px_rgba(185,71,27,0.36)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {formState === "submitting" ? (
                  <>
                    <Loader size={18} className="animate-spin" aria-hidden="true" />
                    Sending your inquiry…
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div
        className="fixed inset-x-4 bottom-4 z-40 flex gap-2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-cream)_92%,white)] p-2 shadow-[var(--shadow-card)] backdrop-blur-xl sm:hidden"
        aria-label="Quick actions"
      >
        <a
          href="#contact"
          className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-full bg-[var(--color-cast-iron)] px-3 text-xs font-black text-[var(--color-cream)] transition hover:bg-[var(--color-tomato)]"
        >
          Book / Contact
        </a>
        <a
          href={grandmaWillieContent.socialLinks.tiktok}
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok (opens in new tab)"
          className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-full bg-[var(--color-tomato)] px-3 text-xs font-black text-white transition hover:bg-[var(--color-tomato-dark)]"
        >
          TikTok
        </a>
      </div>
    </section>
  );
}
