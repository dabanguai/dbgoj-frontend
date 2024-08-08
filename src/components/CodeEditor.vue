<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 600px; height: 70vh"
  />
  {{ value }}
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  lanaguage?: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  lanaguage: "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.lanaguage,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.lanaguage
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.lanaguage,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
  });

  // 编辑监听器变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped>
#code-editor {
}
</style>
