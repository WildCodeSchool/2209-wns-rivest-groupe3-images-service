import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { auth, CustomRequest } from "./services/auth";
import ImagesController from "./controller";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const reqData = req as CustomRequest;
    const dirPath = path.join(__dirname, "../uploads/", reqData.userId, "/");
    fs.mkdirSync(dirPath, { recursive: true });
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.post("/upload", auth, upload.single("file"), ImagesController.create);
router.get("/files/:userId/:filename", ImagesController.read);

export default router;
