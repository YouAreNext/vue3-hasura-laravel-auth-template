<template>
  <el-form-item>
    <span class="svg-container">
      <svg-icon icon-class="user" />
    </span>
  </el-form-item>
  <el-form :model="loginForm" class="login-form" :rules="loginRules" ref="form">
    <el-form-item prop="email" :error="loginFormErrors.email">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="email"
        v-model="loginForm.email"
        placeholder="email"
        name="email"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item prop="password" :error="loginFormErrors.password">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="password"
        v-model="loginForm.password"
        placeholder="password"
        name="password"
        type="password"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>
    <el-button
      type="primary"
      style="width:100%;margin-bottom:30px;"
      @click="handleLogin()"
      >Login</el-button
    >
  </el-form>
  <!-- <el-form
    ref="loginForm"
    
    autocomplete="on"
    label-position="left"
  >
    <div class="title-container">
      <h3 class="title">Login Form</h3>
    </div>

    <el-tooltip
      v-model="capsTooltip"
      content="Caps lock is On"
      placement="right"
      manual
    >
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup="checkCapslock"
          @blur="capsTooltip = false"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
    </el-tooltip>

    <el-button
      :loading="loading"
      type="primary"
      style="width:100%;margin-bottom:30px;"
      >Login</el-button
    >
  </el-form> -->
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, reactive, ref } from "vue";
import { useMutation } from "@vue/apollo-composable";

import LOGIN_QUERY from "@/graphql/login.graphql";

export default defineComponent({
  setup() {
    const router = useRouter();
    const loginForm = reactive({
      email: "",
      password: ""
    });
    const loginFormErrors = reactive<any>({});
    const loginRules = reactive({
      email: [
        {
          required: true,
          message: "Required field",
          trigger: "blur"
        },
        {
          type: "email",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "Required field"
        }
      ]
    });
    const form = ref<null | { validate: (valid: any) => null }>(null);

    const saveUserLocal = (token: string): void => {
      localStorage.setItem("AUTH_TOKEN", token);
    };

    const { mutate: loginQuery } = useMutation(LOGIN_QUERY);

    const handleLogin = async () => {
      form.value?.validate(async (valid: any) => {
        if (valid) {
          const {
            data: { login }
          } = await loginQuery(loginForm);
          saveUserLocal(login.access_token);
          router.push({ name: "Home" });
        }
      });
    };

    const capsTooltip = false;
    return {
      loginForm,
      capsTooltip,
      handleLogin,
      form,
      loginRules,
      loginFormErrors
    };
  }
});
</script>
