import prisma from "../db";

export type IntFieldUpdateOperationsInput = {
    increment?: number;
};
// Get all jobs for users
export const getAllJobs = async (req, res, next) => {
    try {
        const allJobs = await prisma.job.findMany({
            where: {
                published: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        res.json({ data: allJobs });
    } catch (err) {
        next(err);
    }
}

// Get one job for users
export const getJob = async (req, res, next) => {
    try {
        const id = req.params.id;

        const job = await prisma.job.findFirst({
            where: {
                id,
            },
        });

        res.json({ data: job });
    } catch (err) {
        next(err)
    }
};

// Get one job for a given user
export const getOneJob = async (req, res, next) => {
    try {

        const id = req.params.id;
        const job = await prisma.job.findFirst({
            where: {
                id,
            },
        });
        res.json({ data: job });
    } catch (err) {
        next(err);
    }
};

// update views
export const updateviews = async (req, res, next) => {
    try {
        const id = req.params.id;
        const job = await prisma.job.updateMany({
            where: {
                id,
            },
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        });
        res.json({ data: job });
    } catch (err) {
        next(err);
    }
};

// Get all jobs for a given user
export const getUserJobs = async (req, res, next) => {
    try {


        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            include: {
                jobs: true,
            },
        });

        res.json({ data: user.jobs });

    } catch (err) {
        next(err);
    }
};

// Get one job for a given user
export const getUserOneJob = async (req, res, next) => {
    const id = req.params.id;
    try {
        const job = await prisma.job.findFirst({
            where: {
                id,
                belongsToId: req.user.id,
            },
        });
        res.json({ data: job });
    } catch (err) {
        next(err);
    }
};

// Create Job
export const createJob = async (req, res, next) => {
    try {
        const job = await prisma.job.create({
            data: {
                title: req.body.title,
                company: req.body.company,
                experienceLevel: req.body.experienceLevel,
                companyWebsite: req.body.companyWebsite,
                location: req.body.location,
                description: req.body.description,
                contactEmail: req.body.contactEmail,
                applyLink: req.body.applyLink,
                belongsToId: req.user.id,
            },
        });

        res.json({ data: job });
    } catch (err) {
        err.type = "input";
        next(err);
    }
};

export const updateJob = async (req, res, next) => {


    const updated = await prisma.job.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id,
            },
        },
        data: {
            title: req.body.title,
            company: req.body.company,
            experienceLevel: req.body.experienceLevel,
            companyWebsite: req.body.companyWebsite,
            location: req.body.location,
            description: req.body.description,
            contactEmail: req.body.contactEmail,
            applyLink: req.body.applyLink,
            published: req.body.published,
        },
    });
    res.json({ data: updated });

}



export const deleteJob = async (req, res, next) => {
    try {
        const deleted = await prisma.job.delete({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id,
                },
            },
        });

        res.json({ data: "deleted" });
    } catch (err) {
        next(err);
    }
}

