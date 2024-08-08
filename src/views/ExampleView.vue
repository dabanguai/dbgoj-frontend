<template>
  <div id="exampleView">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
    <MdEditor :value="mdValue" :handle-change="onMdValue" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdEditor from "@/components/MdEditor.vue"; // @ is an alias to /src

const mdValue = ref();
const codeValue = ref();

const onCodeChange = (v: string) => {
  codeValue.value = v;
};

const onMdValue = (v: string) => {
  mdValue.value = v;
};
</script>
