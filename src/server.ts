import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, deleteUser, signin } from "./handlers/user";
import { getAllJobs, getJob, updateviews } from "./handlers/jobs";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/status", (req, res) => {
  res.json({ message: "ok" })
})

app.get("/", getAllJobs);
app.get("/job/:id", getJob);
app.put("/job/:id", updateviews);

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.delete("/user", protect, deleteUser);

app.post("/signin", signin)



app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.json(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops server error" });
  }
});

export default app;
