const express = require("express");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const currentPut = async () => {
  let response;
  try {
    response = await axios.get(
      `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${process.env.APIKEY}&startCreateDt=20200315&endCreateDt=20200928`
    );
  } catch (e) {
    console.log(e);
  }
  return response;
};

const currentPutdata = async () => {
  let response;
  try {
    response = await axios.get(
      `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${process.env.APIKEY}`
    );
  } catch (e) {
    console.log(e);
  }
  return response;
};

app.get("/", (req, res) => {
  try {
    currentPutdata().then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(response.data.response.body.items.item[0]);
    });
  } catch (err) {
    console.err(err);
  }
});

app.get("/OfferChartData", (req, res) => {
  try {
    currentPut().then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");

      res.json(response.data.response.body.items.item);
      // console.log(req);
      // console.log(response.data.response.body.items.item);
    });
  } catch (err) {
    console.err(err);
  }
});

app.listen(4000, () => {
  console.log("서버가 연결되었습니다.");
});