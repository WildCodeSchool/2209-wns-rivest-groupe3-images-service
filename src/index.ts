import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (req.file?.path != null) {
    fs.readFile(req.file.path, (err) => {
      if (err != null) {
        console.log("Error: ", err);
        res.status(500).json({ error: err });
      } else {
        if ((req.file?.filename) != null)
          res
            .status(201)
            .json({
              status: "success",
              filename: "/files/" + req.file.filename,
            });
      }
    });
  }
});

app.get("/files/:filename", (req, res) => {
  const file = path.join(__dirname, "/../uploads", req.params.filename);
  console.log("file", file);
  fs.readFile(file, (err, content) => {
    if (err != null) {
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
