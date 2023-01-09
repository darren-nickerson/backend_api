import { request } from "http";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";


export const createNewUser = async (req, res, next) => {
    const hash = await hashPassword(req.body.password);
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: hash,
            },
        });

        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        err.type = "input";
        next(err);
    }
};

export const signin = async (req, res, next) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        const isValid = await comparePasswords(req.body.password, user.password);

        if (!isValid) {
            res.status(401);
            res.json({ message: "no access" });
            return;
        }
        const token = createJWT(user);
        res.json({ token })
    } catch (err) {
        res.status(401);
        res.json({ message: "no access" });
        next(err)
    }
};


export const deleteUser = async (req, res, next) => {
    const deleted = await prisma.user.delete({
        where: {
            id: req.user.id,
        },
    })
    res.json({ data: "deleted" });
}

