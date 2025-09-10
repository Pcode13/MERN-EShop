const { expressjwt: expressJwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.APP_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [`${api}/users/login`, `${api}/users/register`],
  });
}

module.exports = authJwt;
