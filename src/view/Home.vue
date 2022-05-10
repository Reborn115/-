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
                :router="true"
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-submenu index="/FirstPage">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                  </template>

                  <el-menu-item index="/Manage" @click="getTable">
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
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="table_box">
              <img src="../assets/sipcbackground.png" alt="" />
            </div>
          </el-main>
          <el-footer>仅供21级科协小可爱学习使用</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import bus from "../components/bus.js";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      info: {
        token: "",
        page: 1,
        pageSize: 5,
      },
      students: [],
    };
  },
  methods: {
    quit() {
      // 清空token
      window.sessionStorage.clear();
      // 跳转到登录页
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      /* console.log(key, keyPath); */
    },
    handleClose(key, keyPath) {
      /* console.log(key, keyPath); */
    },
    getTable() {
      this.info.token = sessionStorage.getItem("token");
      for (let i = 1; i <= 25; i++) {
        axios({
          method: "post",
          baseURL: "http://47.94.90.140:8000/",
          url:
            "/getAllStuInfo?page=" + this.info.page + "&pageSize=" + this.info.pageSize,
          data: JSON.stringify(this.info),
          headers: {
            "content-type": "application/json",
            token: sessionStorage.getItem("token"),
          },
        }).then((val) => {
          this.students = val.data.data;
          /* console.log(this.students); */
          bus.$emit("pass", val.data.data);

          sessionStorage.setItem("table", JSON.stringify(val.data.data));
          /* console.log(JSON.parse(sessionStorage.getItem("table"))); */
        });
        this.info.page++;
      }
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
