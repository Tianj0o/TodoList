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
  background-color: #b8b6b6;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
