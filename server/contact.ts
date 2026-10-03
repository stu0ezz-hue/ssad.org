import {
  normalizeContactPayload,
  validateContactValues,
  type ContactField,
} from "../src/utils/contactValidation";

type ContactRequestBody = Partial<Record<ContactField, string>> & {
  website?: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimit = new Map<string, RateLimitEntry>();
const fields: ContactField[] = ["name", "email", "phone", "subject", "message"];

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = rateLimit.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimit.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function handleContactRequest(request: Request, clientKey: string) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (isRateLimited(clientKey)) {
    return json({ error: "Too many requests" }, 429);
  }

  let body: ContactRequestBody;
  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  if (body.website) {
    return json({ error: "Invalid request" }, 400);
  }

  const values = Object.fromEntries(
    fields.map((field) => [field, typeof body[field] === "string" ? body[field] : ""]),
  ) as Partial<Record<ContactField, string>>;
  const errors = validateContactValues(values, {
    nameRequired: "Name is required",
    nameInvalid: "Please enter a valid name",
    email: "Please enter a valid email address",
    phone: "Please enter a valid phone number",
    subjectRequired: "Subject is required",
    subjectInvalid: "Please enter a valid subject",
    message: "Message must be between 10 and 3000 characters",
  });

  if (Object.keys(errors).length > 0) {
    return json({ errors }, 422);
  }

  normalizeContactPayload(values);
  return json({ ok: true }, 202);
}
