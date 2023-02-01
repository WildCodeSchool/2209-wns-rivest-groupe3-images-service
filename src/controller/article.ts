import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { CustomRequest } from "../services/auth";

const ArticleController = {
  create: (req: Request, res: Response) => {
    const dataReq = req as CustomRequest;
    const userId = dataReq.userId;
    const { article, blog } = dataReq.params;

    if (req.file?.path) {
      fs.readFile(req.file.path, (err) => {
        if (err) {
          console.error("Error: ", err);
          res.status(500).json({ error: err });
        } else {
          if (req.file?.filename) {
            const imgPath = `/users/${userId}/blogs/${blog}/articles/${article}/files/${req.file.filename}`;
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
    const { user, blog, article, filename } = req.params;
    const file = path.join(
      __dirname,
      "/../../uploads/",
      user,
      blog,
      article,
      filename
    );
    fs.readFile(file, (err, content) => {
      if (err) {
        console.log("err", err);
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
  
  update: (req: Request, res: Response) => {
    const dataReq = req as CustomRequest;
    const userId = dataReq.userId;
    const { article, blog, oldFilename } = dataReq.params;
    const oldFile = path.join(
      __dirname,
      "/../../uploads/",
      userId,
      blog,
      article,
      oldFilename
    );

    if (req.file?.path) {
      fs.readFile(req.file.path, (err) => {
        if (err) {
          console.error("Error: ", err);
          res.status(500).json({ error: err });
        } else {
          if (req.file?.filename) {
            const imgPath = `/users/${userId}/blogs/${blog}/articles/${article}/files/${req.file.filename}`;
            fs.unlink(oldFile, (err) => {
              if (err) {
                res.writeHead(404, { "Content-Type": "text" });
                res.write("File Not Found!");
                res.end();
              } else {
                res.status(201).json({
                  status: "success",
                  filename: imgPath,
                });
              }
            });
          }
        }
      });
    }
  },

  delete: (req: Request, res: Response) => {
    const dataReq = req as CustomRequest;
    const userId = dataReq.userId;
    const { blog, article, filename } = req.params;

    const file = path.join(
      __dirname,
      "/../../uploads/",
      userId,
      blog,
      article,
      filename
    );
    fs.unlink(file, (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text" });
        res.write("File Not Found!");
        res.end();
      } else {
        res.writeHead(202, { "Content-Type": "application/octet-stream" });
        res.write("File deleted successfully !");
        res.end();
      }
    });
  },
};

export default ArticleController;
