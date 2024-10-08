<template>
  <div id="QuestionSubmitView"></div>
  <h2>题目管理</h2>
  <a-form :model="searchParams" layout="inline">
    <a-form-item field="title" label="名称" style="min-width: 240px">
      <a-input v-model="searchParams.title" placeholder="请输入名称" />
    </a-form-item>
    <a-form-item field="tags" label="标签" style="min-width: 280px">
      <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="doSubmit">提交</a-button>
    </a-form-item>
  </a-form>
  <a-divider size="0" />
  <a-table
    :ref="tableRef"
    :columns="columns"
    :data="dataList"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total: total,
    }"
    @page-change="onPageChange"
  >
    <template #optional="{ record }">
      <a-space>
        <a-button type="primary" @click="toQuestionPage(record)">做题</a-button>
      </a-space>
    </template>
    <template #tags="{ record }">
      <a-space wrap>
        <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
          >{{ tag }}
        </a-tag>
      </a-space>
    </template>
    <template #acceptRate="{ record }">
      {{
        `${record.submitNum ? record.acceptNum / record.submitNum : "0"}%
        (${record.acceptNum}/${record.submitNum})`
      }}
    </template>
    <template #createTime="{ record }">
      {{ moment(record.createTime).format("YYYY-MM-DD") }}
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);
const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败" + res.message);
  }
};

/**
 * 监听 searchParams变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptRate",
  },

  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];

const router = useRouter();

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
    query: {
      id: question.id,
    },
  });
};

/**
 * 确认搜索
 */
const doSubmit = () => {
  // 重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#QuestionSubmitView {
  max-width: 1280px;
  margin: auto;
}
</style>
