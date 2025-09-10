const { expressjwt: expressJwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.APP_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

// Only revoke if user is not admin
async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true; // ❌ Block non-admin for protected routes
  }
  return false; // ✅ Allow admin
}

module.exports = authJwt;
