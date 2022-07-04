// 配置axios 实例
import axios from "axios";
// 创立axios实例
// 通过axios创立出来的实例跟axios一模一样
//但是集成了一些配置项
const request = axios.create({
  baseURL: "http://42.192.129.12:8000",
});

export default request;
