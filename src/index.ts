import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { auth } from "./services/auth";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = path.join(__dirname, "../uploads/")
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post(
  "/upload",
  auth,
  upload.single("file"),
  (req: Request, res: Response) => {
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
  }
);

app.get("/files/:filename", (req, res) => {
  const file = path.join(__dirname, "/../uploads", req.params.filename);
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
});

// Initialisation
const start = async (): Promise<void> => {
  app.listen(port, () => console.log(`Server started on ${port}`));
};

void start();
