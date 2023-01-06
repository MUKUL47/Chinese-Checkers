import EventService from "event-service";
import http from "http";
import express from "express";
import path from "path";
import socket from "socket.io";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*" }));
const server = http.createServer(app);
new EventService(new socket.Server(server, {}));
app.use(express.static(path.join(__dirname, "..", "view_build")));
app.get("/", async (req: any, res: any, next: any) =>
  res.sendFile(path.join(__dirname, "..", "view_build", "index.html"))
);
app.get("/test", async (req: any, res: any, next: any) => res.send("test"));
server.listen(process.env.PORT || "8080", () => {
  console.log(`STARTED AT ${process.env.PORT || "8080"}`);
});
if (process.env.KEEP_ALIVE && !isNaN(Number(process.env.KEEP_ALIVE))) {
  setInterval(() => console.log(Date.now()), Number(process.env.KEEP_ALIVE));
}
