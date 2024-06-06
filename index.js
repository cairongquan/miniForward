const express = require("express");
const request = require("axios");
const bodyParse = require("body-parser");

const { decode } = require("./tools");
const App = express();

App.use(bodyParse.urlencoded({ extended: true }));
App.use(bodyParse.json());

//设置跨域访问
App.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (
    req.headers["token"] &&
    decode(req.headers["token"]) === "mobileExpressCai10"
  ) {
    next();
  } else {
    res.send({
      code: 0,
      message: "操作失败",
    });
  }
});

App.post("/sendRequire", (req, res) => {
  const { serviceName, data } = req.body;
  const config = require("./forwardJson.json");
  if (config.serviceMapper[serviceName]) {
    const service = config.serviceMapper[serviceName];
    console.log(service);
    request({
      timeout: 5000,
      url: service.url,
      method: "POST",
    })
      .then(({ data: resolve }) => {
        res.send({
          code: 0,
          message: resolve,
        });
      })
      .catch((err) => {
        res.send({
          code: 1,
          errorMessage: "操作失败",
        });
      });
  } else {
    res.send({
      code: 1,
      errorMessage: "未查询到服务",
    });
  }
});

App.listen(21000, () => {
  console.log("started");
});
