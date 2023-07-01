import React, { useEffect, useState } from "react";
import "./Card2.scss";
import { Col, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import apiRoot from "../../store/apiRoot";
import { useTranslation } from "react-i18next";
import { Line } from "react-chartjs-2";

const Card2 = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const [group, setGroup] = useState(null);
  const [allgroup, setAllGroup] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [allteacher, setAllTeacher] = useState(null);
  const [student, setStudent] = useState(null);
  const [allstudent, setAllStudent] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = () => {
    apiRoot
      .get(`/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGroup(res.data?.data?.Groups[1]);
        setAllGroup(res.data?.data?.Groups[0].all_groups);
        setTeacher(res.data?.data?.Teachers[1]);
        setAllTeacher(res.data?.data.Teachers[0].all_teachers);
        setStudent(res.data?.data?.Students[1]);
        setAllStudent(res.data?.data.Students[0].all_students);
        setSuccess(true);
      })
      .catch(() => {
        // error()
      });
  };

  let dataAll = [];
  if (group != null || group != undefined) {
    dataAll.push(Object.values(group));
  }
  let data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Group",
        data:
          dataAll === [] ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : dataAll[0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  let dataAll2 = [];
  if (teacher != null || teacher != undefined) {
    dataAll2.push(Object.values(teacher));
  }
  let data2 = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Teacher",
        data:
          dataAll2 === []
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            : dataAll2[0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  let dataAll3 = [];
  if (student != null || student != undefined) {
    dataAll3.push(Object.values(student));
  }
  console.log(dataAll3);
  let data3 = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Student",
        data:
          dataAll3 === []
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            : dataAll3[0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  if (!success) return <h1>Loading...</h1>;

  if (success) {
    return (
      <div className="tab_block">
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3 gap-4"
          justify
        >
          <Tab
            eventKey="home"
            title={
              <div className="title">
                <div>{t("card.card1")}</div>
                <div>{allgroup}</div>
              </div>
            }
          >
            <div className="tab_content">
              <ul className="all_user">
                <div>
                  <h2 className="chart_title">ALL GROUPS TILL <span>NOW</span></h2>
                  <Line data={data} />
                </div>
              </ul>
            </div>
          </Tab>
          <Tab
            eventKey="profile"
            title={
              <div className="title">
                <div>{t("card.card2")}</div>
                <div>{allteacher}</div>
              </div>
            }
          >
            <div className="tab_content">
              <div className="worker_list">
                <ul className="atwork">
                  <div className="title">
                  <h2 className="chart_title">ALL TEACHERS TILL <span>NOW</span></h2>
                    <Line data={data2} />
                  </div>
                </ul>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="longer-tab"
            title={
              <div className="title">
                {t("card.card6")}
                <div>{allstudent}</div>
              </div>
            }
          >
            <div className="tab_content">
              <ul className="all_user">
                <div className="title">
                <h2 className="chart_title">ALL STUDENTS TILL <span>NOW</span></h2>
                <Line data={data3} />
                </div>
              </ul>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
};

export default Card2;
