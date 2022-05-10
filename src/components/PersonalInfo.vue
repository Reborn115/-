<template>
  <div>
    <div id="title">
      <h2>天津理工大学计算机科学与工程学院</h2>
      <h2>学生组织报名系统</h2>
    </div>

    <div id="personalInformation">
      <h3>个人信息</h3>
      <form>
        <input
          class="inputNormal"
          type="text"
          v-model="stdId"
          placeholder="请输入学号"
        /><br />
        <input
          class="inputNormal"
          type="text"
          v-model="stdName"
          placeholder="请输入姓名"
        /><br />
        <input
          class="inputNormal"
          type="text"
          v-model="stdQQ"
          placeholder="请输入QQ号"
        /><br />
        <input
          class="inputNormal"
          type="text"
          v-model="stdPhone"
          placeholder="请输入手机号"
        /><br />
      </form>
      <!-- <el-form
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
        id="perInfoInput"
      >
        <el-form-item prop="stdId">
          <el-col :span="24">
            <el-input
              v-model="stdId"
              style="width: 300px"
              placeholder="请输入学号"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="stdName">
          <el-col :span="24">
            <el-input v-model="stdName" placeholder="请输入姓名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="stdQQ">
          <el-col :span="24">
            <el-input v-model="stdQQ" placeholder="请输入QQ号"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="stdPhone">
          <el-col :span="24">
            <el-input v-model="stdPhone" placeholder="请输入手机号"></el-input>
          </el-col>
        </el-form-item>
      </el-form> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalInfo",
  data() {
    return {
      stdId: "",
      stdName: "",
      stdQQ: "",
      stdPhone: "",
      /*  rules: {
        stdId: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 8, max: 8, message: "长度8个字符", trigger: "blur" },
        ],
        stdName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度2-10个字符", trigger: "blur" },
        ],
        stdQQ: [
          { required: true, message: "请输入QQ", trigger: "blur" },
          { min: 6, max: 10, message: "长度6-10个字符", trigger: "blur" },
        ],
        stdPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度11个字符", trigger: "blur" },
        ],
      }, */
    };
  },
};
</script>

<style>
/* #personalInformation {
  text-align: center;
}
#perInfoInput {
  display: inline-block;
} */
</style>
