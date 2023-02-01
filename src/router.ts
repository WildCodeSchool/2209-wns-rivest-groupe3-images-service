import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { auth, CustomRequest } from "./services/auth";
import AvatarController from "./controller/avatar";
import BlogController from "./controller/blog";
import ArticleController from "./controller/article";

const storage = multer.diskStorage({
  destination: function (req, _, cb) {
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
  filename: function (_, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

/*  Routes for an user */
router.post(
  "/upload/avatar",
  auth,
  upload.single("file"),
  AvatarController.create
);
router.get("/users/:user/avatars/:filename", AvatarController.read);
router.delete("/delete/avatars/:filename", auth, AvatarController.delete);
router.delete("/delete-user", auth, AvatarController.deleteAll);

/* Routes for a blog */
router.post(
  "/upload/blog/:blog/cover",
  auth,
  upload.single("file"),
  BlogController.create
);
router.get("/users/:user/blogs/:blog/covers/:filename", BlogController.read);
router.delete(
  "/delete/blogs/:blog/covers/:filename",
  auth,
  BlogController.delete
);
router.delete(
  "/delete-blog/:blog",
  auth,
  BlogController.deleteAll
);

/* Routes for an article */
router.post(
  "/upload/blog/:blog/article/:article",
  auth,
  upload.single("file"),
  ArticleController.create
);
router.get(
  "/users/:user/blogs/:blog/articles/:article/files/:filename",
  ArticleController.read
);
router.delete(
  "/delete/blogs/:blog/articles/:article/files/:filename",
  auth,
  ArticleController.delete
);


export default router;
