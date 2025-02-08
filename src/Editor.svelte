<script>
      import {init} from "./lib/compiler";
      import { io } from "socket.io-client";

    const socket = io();

    // client-side
    socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
    console.log(socket.id); // undefined
    });

    socket.on("error", console.error);

      let compile;
      init().then(res => {
            compile = res;
        });

      let code = $state(localStorage.getItem("bauble-code") || "");

      let error = $state(false);
        let source = $state(false);

      function run() {
      try {
          const res = compile(code);
          console.log('res', {...res, source: null});
          source = {...res, code};
          error = false;
          socket.emit("code", source);
          localStorage.setItem("bauble-code", code);
      } catch {
          error = true;
      }
  }
</script>


<textarea bind:value={code}>

</textarea>

<button onclick={run}>Compile</button>

{#if error}Err{/if}

<style>
    textarea {
        height: 80vh;
        width: 50vw;
    }
</style>