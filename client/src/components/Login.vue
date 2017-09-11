<template>
    <div> Rerouting... </div>
</template>

<script>
    export default {
        created() {
            window.location.href = "http://localhost:8000/api-auth/login";
        }
    }
</script>