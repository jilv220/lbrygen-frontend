<template>
    <img v-if="!isloadErr" 
        :src="originURI" @error="isloadErr = true">
    <img v-else-if="!isRetryErr" 
        :src='originURI' @error="isRetryErr = true">
    <img v-else-if="!isBackupErr" 
        :src='backupURI' @error="isBackupErr = true">
    <img v-else :src="fallbackURI">
</template>

<script>
export default {
    props: {
        originURI: String,
        backupURI: String,
        fallbackURI: String
    },
    data() {
        return {
            isloadErr: false,
            isRetryErr: false,
            isBackupErr: false
        }
    },
}
</script>

<style>
</style>