exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false }) };
  }
  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch (_) {}
  const expected = process.env.I9_INTERNO_PASSWORD;
  if (!expected) {
    return { statusCode: 503, headers, body: JSON.stringify({ ok: false, configuration: false }) };
  }
  const supplied = String(body.password || "");
  if (supplied !== expected) {
    return { statusCode: 401, headers, body: JSON.stringify({ ok: false }) };
  }
  return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
};