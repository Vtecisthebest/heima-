<template>
  <div>
    <van-nav-bar title="登陆" />
    <van-form @submit="onSubmit" class="login-container" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="用户名"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <!-- 验证码输入框：
          type：输入框类型
          maxlength：指定输入最大位数
          required：是否为必填项 -->
          <ToutiaoIcon icon="shouji"></ToutiaoIcon>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="密码"
        :rules="rules.code"
        required
        maxlength="6"
        type="number"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma"></ToutiaoIcon>
        </template>
        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            :time="5000"
            format="ss s"
          />
          <van-button
            :loading="isDisabled"
            v-else
            class="send-sms-btn"
            native-button="button"
            size="small"
            @click="senSmsCode"
            >发送验证码</van-button
          >
          <!-- native-button="button" 阻止按钮提交-->
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "login",
  data() {
    return {
      isShowCountDown: false,
      isDisabled: false,
      user: {
        username: "",
        password: "",
      },
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
    };
  },
  methods: {
    //values自动从表单里面获取的值，
    // 获取的值是对象key，key是表单name的值，value是用户输入的值
    // await后面写的是promise
    // 只有promise 成功的情况下菜继续执行
    // data 数据满足接口文档的格式就可以
    // 如果捕获await的错误。必须要用try和catch
    async onSubmit() {
      // const res = await login(this.user);
      // console.log(res);
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登陆成功");
      } catch (e) {
        //使用可选链运算符进行数据是否存在的判断
        //为什么要判断：如果直接从undefined获取属性，会直接报错，导致程序停滞运行
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    async senSmsCode() {
      // promise（异步解决方案）解决了回调地狱的问题，它把回调地狱改为链式调用。每一次.then 返回一个新的promise
      // async 和await 又解决了链式调用，让代码优雅。看起来是同步问题
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      // 不同的try处理不同的错误
      // 校验的错误>>捕获
      // 接口请求错误 >> 进行错误提示
      try {
        // 合适的时候添加disabled
        this.isDisabled = true;
        // 显示倒计时
        this.isShowCountDown = true;
        // 调用获取验证码接口
        await getSmsCode(this.user.mobile);
        // 获取成功后进行提示
        this.$toast.success("验证码发送成功");
      } catch (e) {
        // 如果发生错误进行提示
        this.$toast.fail(e.response.data.message || "未知错误");
        // 如果发生错误启用this.isShowCountDown = false;
        this.isShowCountDown = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>

<style lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
/deep/.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
