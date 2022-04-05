<template>
    <div>
        <div id="container">
            <iframe
                allowfullscreen webkitallowfullscreen
                :src="this.stream" 
                frameborder="0">
            </iframe>
        </div>
    </div>
</template>

<script>
export default {
    props: {
      stream: String,
    },
    mounted() {
        console.log(this.stream)
    },
}
</script>

<style>
iframe {
    position: absolute; 
    width: 50%;
    height: 50%; 
    top: 0; 
    left: 10rem;
}

#container {
    padding-bottom:56.25%; 
    position:relative;
    display:block; 
    width: 100%
}
</style>