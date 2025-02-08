<script>
  import View from "./View.svelte";
  import Editor from "./Editor.svelte";

    let user = localStorage.getItem("myrole");

    function setUser(str) {
      return () => {
        user = str;
        // localStorage.setItem("myrole", str);
      }
    }

</script>

{#if user === "viewer"}
<View></View>
{:else if user === "editor"}
<Editor></Editor>
{:else}

<button onclick={() => user = "viewer"}>View</button>
<button onclick={() => user = "editor"}>Edit</button>

{/if}