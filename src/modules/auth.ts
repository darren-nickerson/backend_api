import jwt from "jsonwebtoken";
import * as bycrypt from "bcrypt"


export const comparePasswords = (password, hash) => {
  return bycrypt.compare(password, hash);
}

export const hashPassword = (password) => {
  return bycrypt.hash(password, 5)
}

export const createJWT = (user) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email
  },
    process.env.JWT_KEY
  )
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};