<script>
      import { io } from "socket.io-client";
      import Bauble from "./lib/player";

    const socket = io();

    let bauble;
    let canvas;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // client-side
    socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.emit("view", true);
    });

    socket.on("disconnect", () => {
    console.log(socket.id); // undefined
    });

    socket.on("error", console.error);

    socket.on("code", source => {
        console.log('code received', source);
        bauble = new Bauble(canvas, source);
        bauble.set(source.uniformValues);
    })
</script>

<canvas {width} {height} bind:this={canvas}></canvas>

<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
    }
</style>