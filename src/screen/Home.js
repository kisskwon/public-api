import axios from "axios";
import React, { useEffect, useState } from "react";
import { gradeColor, gradeString } from "../constants";

const url =
  "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=month&pageNo=1&numOfRows=100&returnType=json";
const serviceKey =
  "tjm62FrQgXUk1dyiZ8uwzGXN%2Bo02KJBl%2BmP2Xy78VwXchJQwBRbdM15EpccDW5HfdQ0Wl7jvh2pcDkRup9QU0g%3D%3D";
const airList = [
  "통합대기환경",
  "아황산 가스",
  "일산화탄소",
  "오존",
  "일산화질소",
  "미세먼지",
];

function Home(props) {
  const [airState, setAirState] = useState([]);
  const [date, setDate] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5050/" + url + "&serviceKey=" + serviceKey)
      .then((response) => {
        console.log("kks", response);
        const current = response.data.body.items[0];
        // const current = response.data.response.body.items[0];
        const airTemp = [
          { grade: current.khaiGrade, value: current.khaiValue },
          { grade: current.so2Grade, value: current.so2Value },
          { grade: current.coGrade, value: current.coValue },
          { grade: current.o3Grade, value: current.o3Value },
          { grade: current.no2Grade, value: current.no2Value },
          { grade: current.pm10Grade, value: current.pm10Value },
        ];
        setDate(current.dataTime);
        setAirState(airTemp);
        console.log("kks", airTemp);
      })
      .catch((error) => {
        console.log("kks", error);
      });
  }, []);

  return (
    <>
      <div>
        <div>서울 강서구 가양1동 대기/오염 정보</div>
        <div style={{ textAlign: "right" }}>{date}</div>
        {airState.map((state, index) => (
          <Card
            key={airList[index]}
            title={airList[index]}
            grade={state.grade}
            value={state.value}
          />
        ))}
      </div>
    </>
  );
}

const Card = (props) => {
  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <div
        style={{
          width: "80px",
          height: "50px",
          lineHeight: "50px",
          textAlign: "center",
          color: "white",
          backgroundColor: gradeColor[props.grade],
        }}
      >
        {props.value}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          marginLeft: "10px",
        }}
      >
        <div>{props.title}</div>
        <div>{"상태: " + gradeString[props.grade]}</div>
      </div>
    </div>
  );
};

export default Home;
