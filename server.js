import express from "express";
import { Server } from "socket.io";
import http from "node:http";

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("./dist"));

let currentCode = null;

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("code", source => {
        console.log('sending code');
        io.emit("code", source);
        currentCode = source;
    })

    socket.on("view", () => {
        if(currentCode) {
            socket.emit("code", currentCode);
        }
    })
  });



server.listen(port, () => console.log(`Example app listening on port ${port}!`));
