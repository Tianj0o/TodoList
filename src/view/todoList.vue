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
//监听数组变化 done状态TODO的数量
watch(() => state.todoList, () => {
  state.done = state.todoList.filter((item) => {
    return item.status === 'done'
  }).length
}, {
  deep: true
})
//回车按下
const handleEnterCLick = () => {
  if (inputContent.value) {
    state.todoList.push({ name: inputContent.value, status: `${currentList.value == 'done' ? 'done' : 'undone'}` });
    inputContent.value = "";
  }
};
//监听子组件 的done
const handleDoneBtnClick = (index: number) => {
  if (state.todoList[index].status == "done") {
    state.todoList[index].status = "undone";
  } else {
    state.todoList[index].status = "done";
  }
};
//监听子组件的删除
const handleDeleteBtnClick = (index: number) => {
  state.todoList.splice(index, 1);
};

//记录当前的状态 all done undone 默认是all
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
//监听子组件中的移动切换数组中两个元素的位置
const changeTodoList = (obj: any) => {
  console.log('changeemit')
  let startTodo = state.todoList[obj.startIndex]
  state.todoList.splice(obj.startIndex, 1)
  state.todoList.splice(obj.index, 0, startTodo)
}
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
        @change-todo-list="changeTodoList"
      ></to-do>
    </div>
  </div>
</template>

<style scoped lang="less">
.todoList {
  margin: 30px;
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(247, 243, 243);
  width: 50%;
  min-height: 50%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 3px #141627;
  // padding-bottom: 200px;
  overflow: hidden;
  .header {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 2rem;
    }
    .List {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      .category {
        display: flex;
        div {
          color: whitesmoke;
          background-color: #a4a4a7;
          padding: 5px 5px;
          margin-right: 4px;
          margin: 0 5px;
        }
        .active {
          background-color: #25287a;
          border-radius: 10px;
        }
      }
    }
    .addList {
      height: 20px;
      padding: 10px;
      border-bottom: 1px solid grey;
      input {
        // padding: 5px 2px;
        outline: none;
        border: none;
        font-size: 1.1rem;
      }
    }
  }
}
</style>
