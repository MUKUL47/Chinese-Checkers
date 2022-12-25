import EventService from "event-service";
import http from "http";
import socket from "socket.io";
const server = http.createServer();
new EventService(new socket.Server(server, {}));
server.listen(process.env.PORT || 8080);
