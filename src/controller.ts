import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const ImagesController = {
  create: (req: Request, res: Response) => {
    if (req.file?.path) {
      fs.readFile(req.file.path, (err) => {
        if (err) {
          console.error("Error: ", err);
          res.status(500).json({ error: err });
        } else {
          if (req.file?.filename)
            res.status(201).json({
              status: "success",
              filename: "/files/" + req.file.filename,
            });
        }
      });
    }
  },
  read: (req: Request, res: Response) => {
    const file = path.join(
      __dirname,
      "/../uploads/",
      req.params.userId,
      req.params.filename
    );
    fs.readFile(file, (err, content) => {
      if (err) {
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

export default ImagesController;
