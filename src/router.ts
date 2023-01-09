import Router from "express";
import { body, oneOf, check } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createJob, deleteJob, getUserJobs, updateJob } from "./handlers/jobs";

const router = Router();


router.get('/jobs', getUserJobs)


router.put(
    "/job/:id",
    body("title").optional().isString(),
    body("company").optional().isString(),
    body("experienceLevel").optional().isString(),
    body("companyWebsite").optional().isString(),
    oneOf([check("location").optional().isIn(['bury',
        'bolton',
        'manchester',
        'oldham',
        'rochdale',
        'salford',
        'stockport',
        'tameside,',
        'trafford',
        'wigan',
    ])]),
    body("description").optional().isString(),
    body("contactEmail").optional().isString().isEmail().bail(),
    body("applyLink").optional().isString(),
    body("published").optional().isBoolean(),
    handleInputErrors,
    updateJob);

router.post("/job",
    body("title").isString(),
    body("company").isString(),
    body("experienceLevel").isString(),
    body("companyWebsite").isString(),
    oneOf([check("location").isIn(['bury',
        'bolton',
        'manchester',
        'oldham',
        'rochdale',
        'salford',
        'stockport',
        'tameside,',
        'trafford',
        'wigan',
    ])]),
    body("description").isString(),
    body("contactEmail").isString().isEmail().bail(),
    body("applyLink").isString(),
    handleInputErrors, createJob);


router.delete("/user/job/:id", deleteJob);

router.use((err, req, res, next) => {
    if (err.type === "auth") {
        res.json(401).json({ message: "unauthorized" });
    } else if (err.type === "input") {
        res.status(400).json({ message: "invalid input" });
    } else {
        res.status(500).json({ message: "oops server error " });
    }
});

export default router;
