import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { CustomRequest } from "../services/auth";

const BlogController = {
  create: (req: Request, res: Response) => {
    const dataReq = req as CustomRequest;
    const userId = dataReq.userId;
    const blog = dataReq.params.blog;

    if (req.file?.path) {
      fs.readFile(req.file.path, (err) => {
        if (err) {
          console.error("Error: ", err);
          res.status(500).json({ error: err });
        } else {
          if (req.file?.filename) {
            const imgPath = `/users/${userId}/blogs/${blog}/covers/${req.file.filename}`;
            res.status(201).json({
              status: "success",
              filename: imgPath,
            });
          }
        }
      });
    }
  },
  read: (req: Request, res: Response) => {
    const file = path.join(
      __dirname,
      "/../../uploads/",
      req.params.user,
      req.params.blog,
      req.params.filename,
    );
    fs.readFile(file, (err, content) => {
      if (err) {
        console.log("err", err)
        res.writeHead(404, { "Content-Type": "text" });
        res.write("File Not Found!");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "application/octet-stream" });
        res.write(content);
        res.end();
      }
    });
  },
};

export default BlogController;
