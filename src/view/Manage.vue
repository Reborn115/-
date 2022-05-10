<template>
  <div class="homeWrap">
    <el-container class="main_container">
      <el-header>
        <img src="../assets/sipclogo.png" alt="sipclogo" />
        学生组织报名管理
        <el-button type="danger" plain class="btn-quit" @click="quit">退出登录</el-button>
      </el-header>
      <el-container class="height_all">
        <el-aside width="200px" class="height_all">
          <el-row class="tac">
            <el-col :span="24" class="height_all">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                  </template>

                  <el-menu-item index="1-4-1">
                    <i class="el-icon-document"></i>
                    <span>学生管理</span>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>

              <el-breadcrumb-item :to="{ path: '/Manage' }">学生管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="table_box">
              <div class="search">
                <el-input
                  v-model="search"
                  size="medium"
                  placeholder="输入关键字搜索"
                  @input="searchMem"
                  @change="searchMem"
                />
              </div>

              <el-table
                :data="students.slice((currpage - 1) * pagesize, currpage * pagesize)"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  fixed
                  prop="stdId"
                  label="学号"
                  width="90"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column prop="stdName" label="姓名" class="table_header">
                </el-table-column>
                <el-table-column
                  prop="major"
                  label="专业"
                  width="210"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column
                  prop="classNum"
                  label="班级"
                  width="50"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column prop="stdQQ" label="QQ" width="150" class="table_header">
                </el-table-column>
                <el-table-column
                  prop="stdPhone"
                  label="电话"
                  width="150"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column
                  prop="firstWill.organization"
                  label="第一志愿"
                  width="150"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column
                  prop="firstWill.branch"
                  label="部门"
                  width="80"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column
                  prop="firstWill.reason"
                  label="理由"
                  width="180"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column
                  prop="secondWill.organization"
                  label="第二志愿"
                  width="100"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column
                  prop="secondWill.branch"
                  label="部门"
                  width="100"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column
                  prop="secondWill.reason"
                  label="理由"
                  width="180"
                  class="table_header"
                >
                </el-table-column>
                <el-table-column
                  prop="isDispensing"
                  label="调剂"
                  width="50"
                  class="table_header"
                >
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.isDispensing" disabled> </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  prop="date"
                  label="操作"
                  width="180"
                  class="table_header"
                >
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, students)"
                      >编辑</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click.native.prevent="deleteRow(scope.$index, students)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="block">
                <el-pagination
                  fixed
                  background
                  layout="prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currpage"
                  :page-size="pagesize"
                  :total="students.length"
                >
                </el-pagination>
              </div>

              <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
                <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->

                <el-form :model="form">
                  <el-form-item label="学号">
                    <el-input v-model="form.stdId"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名">
                    <el-input v-model="form.stdName"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ">
                    <el-input v-model="form.stdQQ"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <el-input v-model="form.stdPhone"></el-input>
                  </el-form-item>
                  <div class="block">
                    专业与班级
                    <span class="demonstration"></span>
                    <el-cascader
                      v-model="form.majorandclassNum"
                      :options="majorData"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChange"
                    ></el-cascader>
                  </div>
                  <div class="block">
                    第一志愿
                    <span class="demonstration"></span>
                    <el-cascader
                      v-model="form.firstExpectation"
                      :options="orginazationData"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChange"
                    ></el-cascader>
                  </div>
                  <textarea
                    class="textareaNormal"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    v-model="form.firstWill.reason"
                    placeholder="请输入加入此组织的理由"
                  ></textarea>
                  <div class="block">
                    第二志愿
                    <span class="demonstration"></span>
                    <el-cascader
                      v-model="form.secondExpectation"
                      :options="orginazationData"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChange"
                    ></el-cascader>
                  </div>
                  <textarea
                    class="textareaNormal"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    v-model="form.secondWill.reason"
                    placeholder="请输入加入此组织的理由"
                  ></textarea>
                  <div id="tiaoji">
                    <h3>是否调剂</h3>
                    <input
                      class="testswitch-checkbox"
                      id="onoffswitch"
                      type="checkbox"
                      v-model="form.isDispensing"
                    />
                    <label class="testswitch-label" for="onoffswitch">
                      <span class="testswitch-inner" data-on="是" data-off="否"></span>
                      <span class="testswitch-switch"></span>
                    </label>
                  </div>
                </el-form>

                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="update">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </el-main>
          <el-footer>仅供21级科协小可爱学习使用 </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import bus from "../components/bus.js";
export default {
  name: "Manage",
  data() {
    return {
      curentPage1: 1, //默认最开始是第几页
      pagesize: 5, //每页数据条数
      currpage: 1, //默认开始页面
      token: "",
      search: "",
      form: {
        stdId: "20212300",
        stdName: "张三",
        major: "计算机",
        classNum: "3",
        stdQQ: "1234567890",
        stdPhone: "12345678909",
        firstWill: {
          organization: "科协",
          branch: "科协",
          reason: "呜呜呜",
        },
        secondWill: {
          organization: "团委",
          branch: "团委",
          reason: "喂喂喂",
        },
        isDispensing: "是",
        majorandclassNum: ["啊", "这"],
        firstExpectation: ["啊", "这"],
        secondExpectation: ["啊 ", "这"],
      },
      dialogFormVisible: false,
      students: [],
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
  created() {
    //此处的 pass 与 componentA 中定义的emit事件一致。
    bus.$on("pass", (data) => {
      for (let i = 0; i < data.students.length; i++) {
        this.students.push(data.students[i]);
      }

      /* console.log(this.students); //componentA参数 */
    });
  },
  methods: {
    quit() {
      // 清空token
      window.sessionStorage.clear();
      // 跳转到登录页
      this.$router.push("/login");
    },
    searchMem() {
      if (this.search) {
        let sent = {
          taken: "",
          keyWord: "",
        };
        sent.token = sessionStorage.getItem("token");
        sent.keyWord = this.search;
        axios({
          method: "post",
          baseURL: "http://47.94.90.140:8000/",
          url: "/getStuInfo?page=" + this.currpage + "&pageSize=5",
          data: JSON.stringify(sent),
          headers: {
            "content-type": "application/json",
            token: sessionStorage.getItem("token"),
          },
        }).then((val) => {
          this.students = [];
          this.students = val.data.data.students;
        });
      } else {
        this.students();
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },

    handleChange(value) {
      /* console.log(value); */
    },

    update() {
      //   将我们添加的信息提交到总数据里面
      this.form.firstWill.organization = this.form.firstExpectation[0];
      this.form.firstWill.branch = this.form.firstExpectation[1];
      this.form.major = this.form.majorandclassNum[0];
      this.form.classNum = this.form.majorandclassNum[1];
      this.form.secondWill.organization = this.form.secondExpectation[0];
      this.form.secondWill.branch = this.form.secondExpectation[1];
      for (let i = 0; i < this.form.length; i++) {
        this.students.push(this.form[i]);
      }
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      // 将数据的index传递过来用于实现数据的回显
      this.form = this.students[index];
      this.currentIndex = index;
      // 设置对话框的可见
      this.dialogFormVisible = true;
    },
    handleOpen(key, keyPath) {
      /* console.log(key, keyPath); */
    },
    handleClose(key, keyPath) {
      /* console.log(key, keyPath); */
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.token) {
      /* this.$router.push("/Home"); */
      next();
    } else {
      next(false);
      alert("请先登录");
    }
  },
};
</script>

<style>
.btn-quit {
  float: right;
}
</style>
