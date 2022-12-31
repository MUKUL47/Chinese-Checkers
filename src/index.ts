import EventService from "event-service";
import http from "http";
import express from "express";
import path from "path";
import socket from "socket.io";
const app = express();
app.use(express.static(path.join(__dirname, "..", "view_build")));
app.get("/", async (req: any, res: any, next: any) =>
  res.sendFile(path.join(__dirname, "..", "view_build", "index.html"))
);
const server = http.createServer(app);
new EventService(new socket.Server(server, {}));
server.listen(process.env.PORT || 8080);
