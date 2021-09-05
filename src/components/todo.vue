<script lang="ts" setup>
import type { todo } from "../view/config";
import { PropType } from "vue";

defineProps({
  todoList: {
    type: Array as PropType<todo[]>,
    required: true,
  },
  isDone: {
    type: String,
    default: "all",
  },
});
//发出事件
const emit = defineEmits(["handleDoneBtnClick", "handleDeleteBtnClick", 'changeTodoList']);
//完成
const handleDoneBtnClick = (index: number) => {
  emit("handleDoneBtnClick", index);
};
//删除
const handleDeleteBtnClick = (index: number) => {
  emit("handleDeleteBtnClick", index);
};
//记录开始移动的位置
let startIndex: number
//dragStart
const dragStart = (e: DragEvent, index: number) => {
  startIndex = index
  if (e.target) {
    (e.target as HTMLElement).style.opacity = '0.5';
    (e.target as HTMLElement).style.color = 'pink'
  }
}
//dragover
const dragOver = (e: DragEvent, index: number) => {
  if (startIndex !== index) {
    emit('changeTodoList', { startIndex, index })
    startIndex = index
  }
}
//dragEnd
const dragEnd = (e: DragEvent, index: number) => {
  (e.target as HTMLElement).style.opacity = '1';
  (e.target as HTMLElement).style.color = 'black'
}

</script>
<template>
  <div class="todoCpn" ref="listContent">
    <transition-group tag="div" name="dragList" class="list">
      <template v-for="(item, index) in todoList">
        <template v-if="isDone === 'all' || item.status === isDone">
          <div
            :key="item.name"
            v-if="todoList?.length !== 0"
            class="todo"
            :class="item.status === 'done' ? 'done' : ''"
            draggable="true"
            @dragstart="dragStart($event, index)"
            @dragend="dragEnd($event, index)"
            @dragover="dragOver($event, index)"
          >
            <i
              class="iconfont icon-xuanze"
              style="font-size: 1.3rem; color: green"
              @click="handleDoneBtnClick(index)"
            ></i>
            <div class="todoContent">{{ item.name }}</div>
            <i
              class="iconfont icon-quxiao deleteTodo"
              style="font-size: 1.3rem; color: red"
              @click="handleDeleteBtnClick(index)"
            ></i>
          </div>
        </template>
      </template>
    </transition-group>
  </div>
</template>

<style lang="less">
.todoCpn {
  .todo {
    border-bottom: 1px solid grey;
    padding: 10px 0;
    display: flex;
    align-items: center;
    &:hover .deleteTodo {
      opacity: 1;
    }
    .todoContent {
      flex: 1;
      padding: 0 4px;
      word-break: break-all;
    }
    .deleteTodo {
      opacity: 0;
    }
  }
  .todo.done {
    .todoContent {
      text-decoration: line-through #8c8c8c;
      color: #8c8c8c;
    }
  }
}
</style>
