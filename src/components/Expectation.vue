<template>
  <div class="">
    <div id="firstExpectation">
      <h3>第一志愿</h3>
      <form>
        <div class="block">
          <span class="demonstration"></span>
          <el-cascader
            v-model="firstExpectation"
            :options="orginazationData"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </div>
        <textarea
          class="textareaNormal"
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="firstReason"
          placeholder="请输入加入此组织的理由"
        ></textarea>
      </form>
    </div>

    <div id="secondExpectation">
      <h3>第二志愿</h3>
      <form>
        <div class="block">
          <span class="demonstration"></span>
          <el-cascader
            v-model="secondExpectation"
            :options="orginazationData"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </div>
        <textarea
          class="textareaNormal"
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="secondReason"
          placeholder="请输入加入此组织的理由"
        ></textarea>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Expectation",
  data() {
    return {
      firstExpectation: [],
      firstReason: "",
      secondExpectation: [],
      secondReason: "",
      orginazationData: [
        {
          value: "科技协会",
          label: "科技协会",
          children: [
            {
              value: "科技协会",
              label: "科技协会",
            },
          ],
        },
        {
          value: "团委",
          label: "团委",
          children: [
            {
              value: "组织部",
              label: "组织部",
            },
            {
              value: "宣传部",
              label: "宣传部",
            },
            {
              value: "心协",
              label: "心协",
            },
            {
              value: "青协",
              label: "青协",
            },
          ],
        },
        {
          value: "学生会",
          label: "学生会",
          children: [
            {
              value: "办公室",
              label: "办公室",
            },
            {
              value: "学习部",
              label: "学习部",
            },
            {
              value: "宣传部",
              label: "宣传部",
            },
            {
              value: "文艺部",
              label: "文艺部",
            },
            {
              value: "体育部",
              label: "体育部",
            },
            {
              value: "外联部",
              label: "外联部",
            },
            {
              value: "自管会",
              label: "自管会",
            },
          ],
        },
        {
          value: "勤工助学中心",
          label: "勤工助学中心",
          children: [
            {
              value: "管理部",
              label: "管理部",
            },
            {
              value: "活动部",
              label: "活动部",
            },
            {
              value: "助贷部",
              label: "助贷部",
            },
            {
              value: "外联部",
              label: "外联部",
            },
          ],
        },
        {
          value: "新闻中心",
          label: "新闻中心",
          children: [
            {
              value: "摄影协会",
              label: "摄影协会",
            },
            {
              value: "新媒体部",
              label: "新媒体部",
            },
            {
              value: "记者团",
              label: "记者团",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
