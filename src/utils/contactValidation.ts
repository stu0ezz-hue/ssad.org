export type ContactField = "name" | "email" | "phone" | "subject" | "message";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactValidationMessages = {
  nameRequired: string;
  nameInvalid: string;
  email: string;
  phone: string;
  subjectRequired: string;
  subjectInvalid: string;
  message: string;
};

const NAME_PATTERN = /^[\p{Script=Arabic}\p{Script=Latin}\p{M}]+(?:[ '-][\p{Script=Arabic}\p{Script=Latin}\p{M}]+)*$/u;
const EMAIL_PATTERN = /^(?!.*\.\.)[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const PHONE_PATTERN = /^[+\d٠-٩()\s-]+$/u;

function normalizedSpaces(value: string) {
  return value.replace(/\s+/gu, " ").trim();
}

function characterCount(value: string) {
  return Array.from(value).length;
}

function normalizeArabicDigits(value: string) {
  return value.replace(/[٠-٩]/gu, (digit) => String(digit.charCodeAt(0) - 0x0660));
}

export function normalizeContactPayload(input: Partial<Record<ContactField, string>>): ContactPayload {
  const phone = normalizeArabicDigits(String(input.phone ?? "").trim());

  return {
    name: normalizedSpaces(String(input.name ?? "")),
    email: String(input.email ?? "").trim(),
    phone: phone ? phone.replace(/[()\s-]/gu, "") : "",
    subject: normalizedSpaces(String(input.subject ?? "")),
    message: String(input.message ?? "").replace(/\r\n?/gu, "\n").trim(),
  };
}

export function validateContactPayload(
  payload: ContactPayload,
  messages: ContactValidationMessages,
): ContactErrors {
  const errors: ContactErrors = {};
  const nameLength = characterCount(payload.name);
  const messageLength = characterCount(payload.message);
  const subjectLength = characterCount(payload.subject);

  if (
    nameLength < 2 ||
    nameLength > 100 ||
    !NAME_PATTERN.test(payload.name)
  ) {
    errors.name = nameLength === 0 ? messages.nameRequired : messages.nameInvalid;
  }

  if (
    characterCount(payload.email) > 254 ||
    !EMAIL_PATTERN.test(payload.email)
  ) {
    errors.email = messages.email;
  }

  if (payload.phone) {
    const phoneDigits = payload.phone.replace(/^\+/u, "");
    if (
      !PHONE_PATTERN.test(payload.phone) ||
      (payload.phone.startsWith("+") && phoneDigits.length === 0) ||
      !/^\d+$/u.test(phoneDigits) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      errors.phone = messages.phone;
    }
  }

  if (subjectLength > 150) {
    errors.subject = messages.subjectInvalid;
  }

  if (messageLength < 10 || messageLength > 3000) {
    errors.message = messages.message;
  }

  return errors;
}

export function validateContactValues(
  input: Partial<Record<ContactField, string>>,
  messages: ContactValidationMessages,
): ContactErrors {
  const rawSubject = String(input.subject ?? "");
  const payload = normalizeContactPayload(input);
  const errors = validateContactPayload(payload, messages);

  if (rawSubject.length > 0 && payload.subject.length === 0) {
    errors.subject = messages.subjectInvalid;
  }

  return errors;
}

export function getContactFieldError(
  field: ContactField,
  values: Partial<Record<ContactField, string>>,
  messages: ContactValidationMessages,
) {
  return validateContactValues(values, messages)[field];
}
