<template>
    <img src="@/assets/images/x_icon2.png" alt="Ícone X" :style="darkMode ? {filter: 'brightness(0) invert(1)'} : {}"/>
</template>

<script setup>
const props = defineProps({
    darkMode: {
        type: Boolean,
        default: false
    }
})
</script>