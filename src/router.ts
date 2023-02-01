import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { auth, CustomRequest } from "./services/auth";
import AvatarController from "./controller/avatar";
import BlogController from "./controller/blog";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const reqData = req as CustomRequest;
    let dirPath = path.join(__dirname, "../uploads/", reqData.userId, "/");
    const { blog, article } = req.params;

    if (blog) {
      dirPath = path.join(dirPath, blog, "/");
      if (article) {
        dirPath = path.join(dirPath, article, "/");
      }
    }

    fs.mkdirSync(dirPath, { recursive: true });
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/upload/avatar",
  auth,
  upload.single("file"),
  AvatarController.create
);
router.get("/users/:user/avatars/:filename", AvatarController.read);

router.post(
  "/upload/blog/:blog/cover",
  auth,
  upload.single("file"),
  BlogController.create
);
router.get("/users/:user/blogs/:blog/covers/:filename", BlogController.read);
// avatar
// /upload/avatar
// /avatar/:user/:filename

// blog cover
// /upload/cover
// /:user/:blog/:filename

// article
// /upload/article
// /:user/:blog/:article/:filename

export default router;
