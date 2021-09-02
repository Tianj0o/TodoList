<script lang="ts" setup>
import { ref } from "vue";
import type { todo } from "../view/config";
import { PropType } from "vue";

const listContent = ref<HTMLElement>();

const props = defineProps({
  todoList: {
    type: Array as PropType<todo[]>,
    required: true,
  },
  isDone: {
    type: String,
    default: "all",
  },
});
const emit = defineEmits(["handleDoneBtnClick", "handleDeleteBtnClick"]);
const handleDoneBtnClick = (index: number) => {
  emit("handleDoneBtnClick", index);
};
const handleDeleteBtnClick = (index: number) => {
  emit("handleDeleteBtnClick", index);
};
</script>
<template>
  <div class="todoCpn" ref="listContent">
    <template v-for="(item, index) in todoList" :key="index">
      <template v-if="isDone === 'all' || item.status === isDone">
        <div
          v-if="todoList?.length !== 0"
          class="todo"
          :class="item.status === 'done' ? 'done' : ''"
        >
          <i
            class="iconfont icon-xuanze"
            style="font-size: 1.3rem; color: green"
            @click="handleDoneBtnClick(index)"
          ></i>
          <div class="todoContent">{{ item.name }}</div>
          <i
            class="iconfont icon-quxiao"
            style="font-size: 1.3rem; color: red"
            @click="handleDeleteBtnClick(index)"
          ></i>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="less">
.todo {
  border-bottom: 1px solid grey;
  padding: 10px 0;
  display: flex;
  align-items: center;
  .todoContent {
    flex: 1;
    padding: 0 4px;
  }
}
.todo.done {
  .todoContent {
    text-decoration: line-through #8c8c8c;
    color: #8c8c8c;
  }
}
</style>
