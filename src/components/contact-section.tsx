"use client";

import { useState, useId } from "react";
import { CheckCircle, Loader, AlertCircle, Mail, Check } from "lucide-react";
import { grandmaWillieContent } from "@/content/grandma-willie";

type FormState = "idle" | "submitting" | "success" | "error";

type FormData = {
  name: string;
  contact: string;
  inquiryType: string;
  message: string;
  preferredContact: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = "Name is required.";
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
    errors.contact = "Please enter a valid phone number or email address.";
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

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-black text-[var(--color-cast-iron)]"
    >
      {children}
    </label>
  );
}

export function ContactSection() {
  const uid = useId();
  const { contact, contactOptions } = grandmaWillieContent;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    inquiryType: "",
    message: "",
    preferredContact: "",
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  // Validate dynamically on field changes & blur
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
    
    // Mark all as touched
    const allTouched: typeof touched = {
      name: true,
      contact: true,
      inquiryType: true,
      message: true,
    };
    setTouched(allTouched);

    const validationErrors = handleValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      // Focus first error field
      const firstError = Object.keys(validationErrors)[0];
      document.getElementById(`${uid}-${firstError}`)?.focus();
      return;
    }

    setFormState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        console.error("[contact] API error:", json);
        setFormState("error");
        return;
      }
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  // Get field state CSS
  function getFieldClasses(fieldName: keyof FormData, isSelect = false) {
    const base = "mt-1.5 block w-full rounded-xl border bg-[var(--color-paper)] px-4 text-base font-medium text-[var(--color-cast-iron)] outline-none transition placeholder:text-[var(--color-muted)] placeholder:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed";
    const height = isSelect ? "min-h-[48px]" : "min-h-[48px]";
    
    const isTouched = touched[fieldName];
    const hasError = !!errors[fieldName];

    if (!isTouched) {
      return `${base} ${height} border-[var(--color-border-dark)] focus:border-[var(--color-tomato)] focus:ring-3 focus:ring-[var(--color-gold-soft)]`;
    }

    if (hasError) {
      return `${base} ${height} border-[var(--color-tomato)] focus:border-[var(--color-tomato)] focus:ring-3 focus:ring-[color-mix(in_srgb,var(--color-tomato)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-tomato)_3%,white)]`;
    }

    // Valid state
    return `${base} ${height} border-[var(--color-leaf)] focus:border-[var(--color-leaf)] focus:ring-3 focus:ring-[color-mix(in_srgb,var(--color-leaf)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-leaf)_3%,white)]`;
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-[var(--section-y-md)] sm:px-8 lg:px-12"
      style={{ background: "var(--color-cream)" }}
    >
      {/* Subtle border top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--color-border-dark)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[var(--container)]">
        {/* Section header */}
        <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-[var(--color-tomato)]">
          {contact.eyebrow}
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="max-w-[22ch] leading-[0.92] text-[var(--color-cast-iron)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
            }}
          >
            {contact.headline}
          </h2>
          <p className="max-w-[44ch] text-[1.05rem] leading-[1.7] text-[var(--color-warm-brown)] lg:text-right">
            {contact.body}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          {/* ── Left tactile information panel ───────────────────── */}
          <div
            className="relative overflow-hidden rounded-[var(--radius-card)] p-8 text-white shadow-[var(--shadow-card)] border border-[var(--color-tomato-dark)]"
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
            <p className="mt-4 text-[0.95rem] leading-[1.7] text-white/90">
              {contact.leftPanel.body}
            </p>

            {/* Checked, easy to scan list */}
            <ul className="mt-6 space-y-3" aria-label="Contact use cases">
              {contact.leftPanel.useCases.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-black tracking-wide text-white"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-tomato)] shadow-sm"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Separated and styled response time alert */}
            <div className="mt-8 rounded-xl bg-white/12 border border-white/20 p-4 text-[0.85rem] font-bold text-white/95 backdrop-blur-sm shadow-inner">
              <span className="text-[var(--color-gold)] uppercase tracking-wider block text-[0.68rem] font-black mb-0.5">Response Time</span>
              {contact.leftPanel.responseNote}
            </div>
          </div>

          {/* ── Form ─────────────────────────── */}
          {formState === "success" ? (
            <div
              className="flex flex-col items-center justify-center gap-5 rounded-[var(--radius-card)] bg-white p-12 text-center shadow-[var(--shadow-card)] ring-1 ring-[var(--color-border)] border-2 border-[var(--color-leaf)] motion-safe:animate-[formSuccess_0.4s_ease-out_both]"
              role="status"
              aria-live="polite"
            >
              <CheckCircle
                size={60}
                className="text-[var(--color-leaf)] animate-[scaleUp_0.5s_ease-out]"
                aria-hidden="true"
              />
              <div>
                <p
                  className="text-3xl font-black text-[var(--color-cast-iron)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Inquiry Sent Successfully!
                </p>
                <p className="mt-3 max-w-[36ch] text-[1.05rem] leading-[1.7] text-[var(--color-warm-brown)]">
                  Thank you for reaching out. Grandma Willie&apos;s team will review your message and get back to you within 2–3 business days.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Booking and contact form"
              className="grid gap-5 rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-[var(--color-border)] sm:p-9"
            >
              {formState === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl bg-[color-mix(in_srgb,var(--color-tomato)_8%,white)] p-4 text-sm text-[var(--color-tomato)] border border-[var(--color-tomato)]/30"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="font-bold">
                    Something went wrong. Please try again or reach out directly.
                  </p>
                </div>
              )}

              {/* Name */}
              <div>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={`${uid}-name`}>
                    Name <span aria-hidden="true" className="text-[var(--color-tomato)]">*</span>
                  </FieldLabel>
                  {touched.name && !errors.name && (
                    <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[var(--color-leaf)]">
                      <Check size={12} strokeWidth={3} /> Done
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
                  placeholder="Your name"
                  className={getFieldClasses("name")}
                />
                {touched.name && errors.name && (
                  <p id={`${uid}-name-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--color-tomato)]">
                    <AlertCircle size={12} />
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
                    <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[var(--color-leaf)]">
                      <Check size={12} strokeWidth={3} /> Perfect
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
                    <AlertCircle size={12} />
                    {errors.contact}
                  </p>
                )}
              </div>

              {/* Inquiry type */}
              <div>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={`${uid}-inquiryType`}>
                    Inquiry type <span aria-hidden="true" className="text-[var(--color-tomato)]">*</span>
                  </FieldLabel>
                  {touched.inquiryType && !errors.inquiryType && (
                    <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[var(--color-leaf)]">
                      <Check size={12} strokeWidth={3} /> Selected
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
                  className={getFieldClasses("inquiryType", true)}
                >
                  <option value="" disabled>Select inquiry type</option>
                  {contactOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {touched.inquiryType && errors.inquiryType && (
                  <p id={`${uid}-inquiryType-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--color-tomato)]">
                    <AlertCircle size={12} />
                    {errors.inquiryType}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={`${uid}-message`}>
                    Message <span aria-hidden="true" className="text-[var(--color-tomato)]">*</span>
                  </FieldLabel>
                  {touched.message && !errors.message && (
                    <span className="flex items-center gap-1 text-[0.68rem] font-bold text-[var(--color-leaf)]">
                      <Check size={12} strokeWidth={3} /> Looks great
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
                  placeholder="Tell us what you have in mind…"
                  className={`${getFieldClasses("message")} py-3 resize-y min-h-[120px]`}
                />
                {touched.message && errors.message && (
                  <p id={`${uid}-message-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--color-tomato)]">
                    <AlertCircle size={12} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Preferred contact */}
              <div>
                <FieldLabel htmlFor={`${uid}-preferredContact`}>
                  Preferred contact method <span className="font-medium text-[var(--color-muted)] normal-case text-xs ml-1">(optional)</span>
                </FieldLabel>
                <input
                  id={`${uid}-preferredContact`}
                  name="preferredContact"
                  type="text"
                  disabled={formState === "submitting"}
                  value={formData.preferredContact}
                  onChange={handleChange}
                  placeholder="Email, phone call, text…"
                  className="mt-1.5 block w-full min-h-[48px] rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-paper)] px-4 text-base font-medium text-[var(--color-cast-iron)] outline-none transition placeholder:text-[var(--color-muted)] placeholder:opacity-60 focus:border-[var(--color-tomato)] focus:ring-3 focus:ring-[var(--color-gold-soft)] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[var(--color-cast-iron)] px-8 text-base font-black text-[var(--color-cream)] shadow-[0_14px_36px_rgba(20,11,7,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--color-tomato)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-75"
                aria-live="polite"
              >
                {formState === "submitting" ? (
                  <>
                    <Loader size={18} className="animate-spin" aria-hidden="true" />
                    Sending inquiry...
                  </>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div
        className="fixed inset-x-4 bottom-4 z-40 flex gap-2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-cream)_92%,white)] p-2 shadow-[var(--shadow-card)] backdrop-blur-xl sm:hidden"
        aria-label="Quick actions"
      >
        <a
          href="#contact"
          className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-full bg-[var(--color-cast-iron)] px-3 text-xs font-black text-[var(--color-cream)] transition hover:bg-[var(--color-tomato)]"
        >
          Contact
        </a>
        <a
          href={grandmaWillieContent.socialLinks.tiktok}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-full bg-[var(--color-tomato)] px-3 text-xs font-black text-white transition hover:bg-[var(--color-tomato-dark)]"
        >
          TikTok
        </a>
      </div>
    </section>
  );
}
