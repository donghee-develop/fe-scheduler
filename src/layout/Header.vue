<script setup>
import router from "@/router/router.js";


const goToMain = () => {
  router.push("/");
}
</script>

<template>
<div class="main-div" @click="goToMain()">메인으로 가기</div>
</template>

<style scoped>
.main-div {
  color:blue;
  text-decoration: underline;
}
.main-div:hover{
  cursor:pointer;
}
</style>