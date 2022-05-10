<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import Login from "./view/Login";
import SignUp from "./view/SignUp";
import Home from "./view/Home";
import Manage from "./view/Manage";

export default {
  name: "app",
  components: {
    Login,
    SignUp,
    Home,
    Manage,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
