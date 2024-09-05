var jose = require("jose");

async function signToken(user) {
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.SK);
  const token = await new jose.SignJWT({ user: user })
    .setProtectedHeader({
      alg,
    })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return token;
}
module.exports = {
  signToken,
};
