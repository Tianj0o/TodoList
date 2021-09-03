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


const emit = defineEmits(["handleDoneBtnClick", "handleDeleteBtnClick", 'changeTodoList']);
const handleDoneBtnClick = (index: number) => {
  emit("handleDoneBtnClick", index);
};
const handleDeleteBtnClick = (index: number) => {
  emit("handleDeleteBtnClick", index);
};

let startIndex: number
const dragStart = (e: DragEvent, index: number) => {
  // console.log(startIndex)
  startIndex = index
  if (e.target) {
    (e.target as HTMLElement).style.opacity = '0.5'
  }
}

let pre: number
const dragOver = (e: DragEvent, index: number) => {
  e.preventDefault();

  if (startIndex !== index && pre !== index) {

    emit('changeTodoList', { startIndex, index })
    startIndex = index
    pre = index
  }
}
const dragEnd = (e: DragEvent, index: number) => {
  (e.target as HTMLElement).style.opacity = '1'
  pre = -1
}

const currentTodo = ref<HTMLElement>()

</script>
<template>
  <div class="todoCpn" ref="listContent">
    <transition-group tag="div" name="drag">
      <template v-for="(item, index) in todoList" :key="index">
        <template v-if="isDone === 'all' || item.status === isDone">
          <div
            v-if="todoList?.length !== 0"
            class="todo"
            :class="item.status === 'done' ? 'done' : ''"
            draggable="true"
            ref="currentTodo"
            :key="index"
            @dragstart="dragStart($event, index)"
            @dragover="dragOver($event, index)"
            @dragend="dragEnd($event, index)"
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
  position: relative;
  .drag-enter-active {
    transition: all ease 0.3s;
  }
}
.drag-enter-from,
.drag-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.todo {
  position: relative;
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
  background-color: burlywood;
  .todoContent {
    text-decoration: line-through #8c8c8c;
    color: #8c8c8c;
  }
}
</style>
