<script>
    export let data;

    const image = data.image;
</script>

<img src="{image.identifier}" title={"species: " + data.speciesName + "\n" + "by " + image.rightsHolder + '\n' + "license:" + "\n" + image.license} alt="Image of {data.speciesName} by {image.rightsHolder}, licensed under {image.license}">
