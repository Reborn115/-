<template>
  <div>
    <!-- <div id="background"></div> -->
    <div id="app">
      <div id="title">
        <h2>天津理工大学计算机科学与工程学院</h2>
        <h2>学生组织报名系统</h2>
      </div>

      <div id="personalInformation">
        <h3>个人信息</h3>
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="demo-ruleForm"
          id="perInfoInput"
        >
          <el-form-item prop="stdId">
            <el-col :span="24">
              <el-input v-model="form.stdId" placeholder="请输入学号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="stdName">
            <el-col :span="24">
              <el-input v-model="form.stdName" placeholder="请输入姓名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="stdQQ">
            <el-col :span="24">
              <el-input v-model="form.stdQQ" placeholder="请输入QQ号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="stdPhone">
            <el-col :span="24">
              <el-input v-model="form.stdPhone" placeholder="请输入手机号"></el-input>
            </el-col>
          </el-form-item>
          <h3>专业与班级</h3>

          <div class="block">
            <span class="demonstration"></span>
            <el-cascader
              v-model="form.majorandclassNum"
              :options="majorData"
              :props="{ expandTrigger: 'hover' }"
              prop="majorandclassNum"
            ></el-cascader>
          </div>

          <h3>第一志愿</h3>

          <div class="block">
            <span class="demonstration"></span>
            <el-cascader
              v-model="form.firstExpectation"
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
            v-model="form.firstReason"
            placeholder="请输入加入此组织的理由"
          ></textarea>

          <h3>第二志愿</h3>

          <div class="block">
            <span class="demonstration"></span>
            <el-cascader
              v-model="form.secondExpectation"
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
            v-model="form.secondReason"
            placeholder="请输入加入此组织的理由"
          ></textarea>
          <div class="">
            <div id="tiaoji">
              <h3>是否调剂</h3>

              <el-form-item label="" prop="isDispensing">
                <el-switch
                  v-model="isDispensing"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </div>
          </div>

          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm')">立即报名</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="login">管理员登录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <p>仅供21级科协小可爱学习使用</p>
        <p>2022@政东</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PersonalInfo from "../components/PersonalInfo.vue";
import MajorList from "../components/MajorList.vue";
import Expectation from "../components/Expectation.vue";
export default {
  name: "Sign",
  data() {
    return {
      form: {
        stdId: "",
        stdName: "",
        stdQQ: "",
        stdPhone: "",
        majorandclassNum: "",
        firstExpectation: [],
        firstReason: "",
        secondExpectation: [],
        secondReason: "",
      },
      rules: {
        stdId: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 8, max: 8, message: "长度为8个字符", trigger: "blur" },
        ],
        stdName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" },
        ],
        stdQQ: [
          { required: true, message: "请输入QQ号", trigger: "blur" },
          { min: 6, max: 10, message: "长度为10个字符", trigger: "blur" },
        ],
        stdPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        majorandclassNum: [
          { required: true, message: "请选择专业和班级", trigger: "change" },
        ],
        firstExpectation: [
          { required: true, message: "请选择第一志愿", trigger: "change" },
        ],
        firstReason: [{ required: true, message: "请填写理由", trigger: "change" }],
      },
      isDispensing: true,
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
      majorData: [
        {
          value: "计算机科学与技术",
          label: "计算机科学与技术",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
          ],
        },
        {
          value: "信息安全",
          label: "信息安全",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
          ],
        },
        {
          value: "物联网",
          label: "物联网",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
          ],
        },
        {
          value: "数据科学与大数据技术",
          label: "数据科学与大数据技术",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
          ],
        },
        {
          value: "计算机科学与技术(中外合作)",
          label: "计算机科学与技术(中外合作)",
          children: [
            {
              value: "一班",
              label: "一班",
            },
            {
              value: "二班",
              label: "二班",
            },
            {
              value: "三班",
              label: "三班",
            },
            {
              value: "四班",
              label: "四班",
            },
            {
              value: "五班",
              label: "五班",
            },
            {
              value: "六班",
              label: "六班",
            },
          ],
        },
      ],
    };
  },
  components: {
    PersonalInfo,
    MajorList,
    Expectation,
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let send = {
            stdId: this.form.stdId,
            stdName: this.form.stdName,
            major: this.form.majorandclassNum[0],
            classNum: this.form.majorandclassNum[1],
            stdQQ: this.form.stdQQ,
            stdPhone: this.form.stdPhone,
            firstWill: {
              organization: this.form.firstExpectation[0],
              branch: this.form.firstExpectation[1],
              reason: this.form.firstReason,
            },
            secondWill: {
              organization: this.form.secondExpectation[0],
              branch: this.form.secondExpectation[1],
              reason: this.form.secondReason,
            },
            isDispensing: this.isDispensing,
          };
          axios({
            method: "post",
            baseURL: "http://47.94.90.140:8000/",
            url: "/post",
            data: JSON.stringify(send),
            headers: {
              "content-type": "application/json",
            },
          });

          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  z-index: 1;
}
#background {
  z-index: 0;
  background: url("../assets/鸣人.jpeg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background-color: "#000";
}

#personalInformation {
  text-align: center;
}
#perInfoInput {
  display: inline-block;
}
.bgBackground {
  width: 100%;
  height: 150;
}
</style>
