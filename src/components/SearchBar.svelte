<script>

    let search;

    function submitSearch(event) {
        if (event.key === 'Enter' && search) {
            window.location.href = "/query?query=" + encodeURIComponent(search);
        }
    }
</script>

<input on:keypress={submitSearch} bind:value={search} type="search" class="input rounded-md" placeholder="Insert query...">
