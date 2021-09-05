<script setup lang="ts">
import todoList from "./view/todoList.vue";
</script>

<template>
  <todo-list></todo-list>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  background-color: #25287a;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-family: MyCask;
}
</style>
