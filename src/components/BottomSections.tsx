import { Building2 } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { BiText, Button, Reveal, Section } from "./ui";
import {
  getContactFieldError,
  normalizeContactPayload,
  validateContactValues,
  type ContactErrors,
  type ContactField,
} from "../utils/contactValidation";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

/* ---------- Partners ---------- */
export function Partners() {
  const { t } = useLang();

  return (
    <Section eyebrow={t.partners.eyebrow} title={t.partners.title}>
      <Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {t.partners.items.map((name, i) => (
            <div
              key={i}
              className="group flex items-center justify-center h-24 md:h-28 px-4 rounded-lg border border-sand-200 bg-white hover:border-teal-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2.5 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all">
                <Building2 size={22} className="text-navy-700" />
                <span className="text-sm font-semibold text-navy-700">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={180}>
        <p className="text-center mt-10 text-sm text-navy-600 italic max-w-2xl mx-auto">
          {t.partners.note}
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------- CTA ---------- */
export function CTA() {
  const { t } = useLang();

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-navy-900 text-white"
    >
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, rgba(224, 180, 82, 0.5) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(20, 125, 96, 0.4) 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 py-20 md:py-28 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            <BiText value={t.cta.title} />
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            <BiText value={t.cta.text} />
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-300 text-navy-900 font-semibold px-7 py-3.5 rounded-md shadow-lg hover:shadow-xl transition-all"
            >
              {t.cta.donate}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md transition-all"
            >
              {t.cta.volunteer}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-white/90 hover:text-white font-medium px-5 py-3.5 transition-colors"
            >
              {t.cta.contact}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const readValues = (form: HTMLFormElement) => {
    const data = new FormData(form);
    return {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };
  };

  const validateForm = (form: HTMLFormElement) =>
    validateContactValues(readValues(form), t.contact.form.errors);

  useEffect(() => {
    if (!formRef.current || Object.keys(touched).length === 0) return;
    setErrors(validateForm(formRef.current));
  }, [t, touched]);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.currentTarget.name as ContactField;
    const value = e.currentTarget.value;
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({
      ...current,
      [field]: getContactFieldError(field, { [field]: value }, t.contact.form.errors),
    }));
    setStatus("idle");
  };

  const handleFieldBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.currentTarget.name as ContactField;
    const value = e.currentTarget.value;
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({
      ...current,
      [field]: getContactFieldError(field, { [field]: value }, t.contact.form.errors),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (isSubmitting) return;

    const values = readValues(form);
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }
    const cleanPayload = normalizeContactPayload(values);
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
      if (!endpoint) throw new Error("Contact endpoint is not configured");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cleanPayload),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          errors?: ContactErrors;
        } | null;
        if (result?.errors) setErrors(result.errors);
        throw new Error("Contact submission failed");
      }

      setStatus("success");
      setErrors({});
      setTouched({});
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" title={t.contact.title} subtle>
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        {/* Info */}
        <Reveal className="lg:col-span-2">
          <p className="text-navy-600 leading-relaxed mb-8">
            <BiText value={t.contact.text} />
          </p>
          <dl className="space-y-5">
            <div className="flex gap-4 items-start">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-navy-500 font-semibold mb-1">
                  <BiText value={t.contact.email.label} />
                </dt>
                <dd>
                  <a
                    href={`mailto:${t.contact.email.value}`}
                    className="text-navy-900 font-medium hover:text-teal-600 transition-colors"
                  >
                    {t.contact.email.value}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-navy-500 font-semibold mb-1">
                  <BiText value={t.contact.phone.label} />
                </dt>
                <dd>
                  <a
                    href={`tel:${t.contact.phone.value}`}
                    className="text-navy-900 font-medium hover:text-teal-600 transition-colors"
                  >
                    {t.contact.phone.value}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-navy-500 font-semibold mb-1">
                  <BiText value={t.contact.address.label} />
                </dt>
                <dd className="text-navy-900 font-medium">
                  <BiText value={t.contact.address.value} />
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-10">
            <div className="text-xs uppercase tracking-wide text-navy-500 font-semibold mb-4">
              {t.contact.follow}
            </div>
            <div className="flex gap-3">
              {[
                { name: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { name: "Instagram", d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" },
                { name: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" },
                { name: "YouTube", d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-11 h-11 flex items-center justify-center rounded-lg border border-sand-200 text-navy-600 hover:bg-navy-800 hover:text-gold-300 hover:border-navy-800 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d} />
                    {s.name === "Instagram" && (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      </>
                    )}
                    {s.name === "LinkedIn" && <circle cx="4" cy="4" r="2" />}
                    {s.name === "YouTube" && (
                      <path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120} className="lg:col-span-3">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="bg-white border border-sand-200 rounded-lg p-6 md:p-8 shadow-sm"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label={t.contact.form.name}
                name="name"
                required
                error={errors.name}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                showError={!!touched.name}
              />
              <Field
                label={t.contact.form.email}
                name="email"
                type="email"
                required
                error={errors.email}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                showError={!!touched.email}
              />
              <Field
                label={t.contact.form.phone}
                name="phone"
                type="tel"
                error={errors.phone}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                showError={!!touched.phone}
              />
              <Field
                label={t.contact.form.subject}
                name="subject"
                error={errors.subject}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                showError={!!touched.subject}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-navy-800 mb-2"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                aria-invalid={!!errors.message && !!touched.message}
                aria-describedby={errors.message && touched.message ? "msg-error" : undefined}
                className={`w-full px-4 py-3 text-navy-900 bg-sand-50 border rounded-md focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors resize-none ${
                  errors.message && touched.message ? "border-red-400" : "border-sand-200"
                }`}
                placeholder={t.contact.form.messagePlaceholder}
              />
              {errors.message && touched.message && (
                <p id="msg-error" className="text-sm text-red-600 mt-1.5">
                  {errors.message}
                </p>
              )}
            </div>

            {status === "success" && (
              <div
                role="status"
                className="mt-5 p-4 bg-teal-50 border border-teal-200 text-teal-800 rounded-md text-sm"
              >
                {t.contact.form.success}
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                className="mt-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
              >
                {Object.keys(errors).length > 0
                  ? t.contact.form.validationSummary
                  : t.contact.form.error}
              </div>
            )}

            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {t.contact.form.send}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  showError = false,
  onChange,
  onBlur,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  showError?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = `${name}-field`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-navy-800 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error && showError}
        aria-describedby={error && showError ? `${id}-error` : undefined}
        className={`w-full px-4 py-3 text-navy-900 bg-sand-50 border rounded-md focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors ${
          error && showError ? "border-red-400" : "border-sand-200"
        }`}
      />
      {error && showError && (
        <p id={`${id}-error`} className="text-sm text-red-600 mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}
