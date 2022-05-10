<template>
  <div class="login_box">
    <div>
      <img src="../assets/sipclogo.png" alt="A logo of SIPC." />
    </div>
    <form>
      <input
        type="text"
        class="input-normal"
        id="user"
        placeholder="用户名"
        value=""
        v-model="username"
      />
      <input
        type="text"
        class="input-normal"
        id="password"
        placeholder="密码"
        value=""
        v-model="password"
      />

      <div type="submit" id="btn-login" class="login" @click="login">
        <p>登录</p>
      </div>

      <input type="reset" id="btn-register" value="重置" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      let send = {
        username: this.username,
        password: this.password,
      };
      axios({
        method: "post",
        baseURL: "http://47.94.90.140:8000/",
        url: "/login",
        data: JSON.stringify(send),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((val) => {
          sessionStorage.setItem("token", val.data.data.token);
          if (val.data.data.token) {
            this.$router.push("/Home");
          }
        })
        .catch((error) => {
          alert("登录失败，请检查账号密码");
        });
    },
  },
};
</script>

<style></style>
