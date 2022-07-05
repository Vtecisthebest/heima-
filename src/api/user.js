//封装数据接口
import request from "@/Utils/request";

export const login = (data) => {
  return request({
    method: "post",
    url: "/v1_0/authorizations",
    data,
  });
};
export const getSmsCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
