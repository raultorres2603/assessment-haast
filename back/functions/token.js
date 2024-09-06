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

async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.SK);
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  signToken,
  verifyToken,
};
