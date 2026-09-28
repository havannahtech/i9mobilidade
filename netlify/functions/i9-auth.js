exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, reason: "method" }) };
  }
  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch (_) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, reason: "body" }) };
  }
  const rawExpected = process.env.I9_INTERNO_PASSWORD;
  if (typeof rawExpected !== "string" || rawExpected.trim().length === 0) {
    return { statusCode: 503, headers, body: JSON.stringify({ ok: false, reason: "env_missing" }) };
  }
  const expected = rawExpected.trim();
  const supplied = String(body.password ?? "").trim();
  if (supplied !== expected) {
    return { statusCode: 401, headers, body: JSON.stringify({ ok: false, reason: "mismatch", envLoaded: true }) };
  }
  return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
};