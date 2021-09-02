<script lang="ts" setup>
import { computed, reactive, ref } from "@vue/reactivity";
import type { todoliststate } from "./config";
import toDo from "../components/todo.vue";
import { watch } from "@vue/runtime-core";

const inputContent = ref<string>("");


const allCount = computed(() => state.todoList.length)

const state = reactive<todoliststate>({
  todoList: [],
  done: 0
});

watch(() => state.todoList, () => {
  state.done = state.todoList.filter((item) => {
    return item.status === 'done'
  }).length

}, {
  deep: true
})

const handleEnterCLick = () => {
  if (inputContent.value) {
    state.todoList.push({ name: inputContent.value, status: `${currentList.value == 'done' ? 'done' : 'undone'}` });
    inputContent.value = "";
  }
};
const handleDoneBtnClick = (index: number) => {
  if (state.todoList[index].status == "done") {
    state.todoList[index].status = "undone";
  } else {
    state.todoList[index].status = "done";
  }
};
const handleDeleteBtnClick = (index: number) => {
  state.todoList.splice(index, 1);
};
const currentList = ref("all");
const changeToAllList = () => {
  currentList.value = "all";
};
const changeToDoneList = () => {
  currentList.value = "done";
};
const changeToUndoneList = () => {
  currentList.value = "undone";
};
</script>

<template>
  <div class="todoList">
    <div class="header">
      <h3 class="title">TODO List</h3>
      <div class="List">
        <div class="category">
          <div
            :class="currentList === 'all' ? 'active' : ''"
            @click="changeToAllList"
          >ALL:{{ allCount }}</div>
          <div
            :class="currentList === 'done' ? 'active' : ''"
            @click="changeToDoneList"
          >Done:{{ state.done }}</div>
          <div
            :class="currentList === 'undone' ? 'active' : ''"
            @click="changeToUndoneList"
          >UnDone{{ allCount - state.done }}</div>
        </div>
      </div>
      <div class="addList">
        <input
          @keydown.enter="handleEnterCLick"
          type="text"
          v-model="inputContent"
          placeholder="Enter TODOS"
        />
      </div>
    </div>
    <div class="content">
      <to-do
        :is-done="currentList"
        :todoList="state.todoList"
        @handle-done-btn-click="handleDoneBtnClick"
        @handle-delete-btn-click="handleDeleteBtnClick"
      ></to-do>
    </div>
  </div>
</template>

<style scoped lang="less">
.todoList {
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(247, 243, 243);
  width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 5px 3px rgb(92, 91, 91);
  .header {
    display: flex;
    flex-direction: column;
    .List {
      display: flex;
      justify-content: space-between;
      .category {
        display: flex;
        div {
          padding: 5px 5px;
          margin-right: 4px;
        }
        .active {
          background-color: grey;
          border-radius: 10px;
        }
      }
    }
    .addList {
      height: 20px;
      padding: 10px;
      border-bottom: 1px solid grey;
      input {
        padding: 5px 2px;
        outline: none;
        border: none;
        font-size: 1.1rem;
      }
    }
  }
}
</style>
