import React, { useEffect, useRef, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import apiRoot from "../../store/apiRoot";
import Edit from "../../assets/image/Group 9.svg";
import Dalate from "../../assets/image/Group 10.svg";
import UploadImage from "../../assets/image/upload.svg";
import Lock from "../../assets/image/lock (1).png";
import "../Homework/homework.scss";
import "../SingleGroup/singleGroup.scss";
import { useTranslation } from "react-i18next";
import SuperModal from "../../components/SuperModal/SuperModal";
import { error } from "../../services/Error";

import toast, { Toaster } from "react-hot-toast";
const notify1 = () => toast.success("Successfully Updated Grade");
export const SingleGrade = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [code, setCode] = useState(false);
  const bahoRef = useRef();
  const descRef = useRef();
  const token = localStorage.getItem("token");
  const [group, setGroup] = useState();
  const [student, setStudent] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const [getGroup, setGetGroup] = useState([]);
  const [check, setCheck] = useState(false);
  const [homework, setHomework] = useState([]);
  const [homeworkImg, setHomeworkImg] = useState();
  const [title, setTitle] = useState();
  const [lesson, setLesson] = useState();
  const [send, setSend] = useState();
  const [desc, setDesc] = useState();
  const [baxo, setBaxo] = useState();
  const [img, setImg] = useState();

  const [name, setName] = useState();
  const [homId, sethomId] = useState();
  const [hId, sethId] = useState();

  const getStudents = () => {
    apiRoot
      .get(`/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data?.data);
        const allSrudents = res.data?.data;
        if (allSrudents) {
          const myStudents = allSrudents.filter((el) => el.groupId?._id == id);

          setStudent(myStudents);

          apiRoot
            .get("/grade", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data?.data, "grade");
              const grades = res.data?.data;
              if (grades) {
                console.log(allSrudents, "allStudent");
                const filterData = [];
                const newData = allSrudents.filter((el1) => {
                  // console.log(el1._id, 'el');
                  grades.forEach((el) => {
                    if (
                      el.homeworkId?.studentId == el1._id &&
                      el1.groupId?._id == el.homeworkId?.groupId
                    ) {
                      console.log(el, "el");
                      el1.baho = el.rank;
                      el1.description = el.description;
                      el1.homeworkId = el.homeworkId?._id;
                      el1.gradeId = el?._id;
                    } else {
                      el1.baho = 0;
                      el1.description = "";
                      el1.homeworkId = null;
                      el1.gradeId = null;
                    }
                  });
                  return el1;
                });
                const last = newData.filter(
                  (el) => el.groupId?._id == id && el.gradeId
                );
                setAllStudent(last);
                console.log(last, "last");
                console.log(newData, "newData");
              }
            });
        }
      });
  };
  const getGroups = () => {
    apiRoot
      .get(`/tGroup/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data) {
          setGetGroup(res.data?.data);
        }
      });
  };
  const getHomeworkOne = (id) => {
    console.log(img, "img");
    apiRoot
      .get(`/check/homework/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data?.data, "dataaaa");
        const homeworkOne = res.data?.data;
        if (homeworkOne) {
          setHomeworkImg(homeworkOne[0]?.image);
          setTitle(homeworkOne[0]?.title);
          setLesson(homeworkOne[0]?.lesson);
          setSend(homeworkOne[0]?.createdAt);
          setName(
            homeworkOne[0]?.studentId?.name +
              " " +
              homeworkOne[0]?.studentId?.surname
          );
          // setHomework(res.data?.data);
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(homId, "homId");
    setCode(false);
    const data = {
      title: title,
      lesson: lesson,
      homeworkId: hId,
      rank: +bahoRef.current?.value,
      description: descRef.current?.value,
    };
    console.log(data);
    apiRoot
      .put(`/editGrade/${homId} `, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log(res.data);
        }
        notify1();
      })
      .catch((error) => {
        error();
      });
  };
  useEffect(() => {
    getGroups();
    getStudents();
    console.log(getGroup[0], "single");
  }, []);
  useEffect(() => {
    getGroups();
    getStudents();
    console.log(getGroup[0], "single");
  }, [code]);
  console.log(id);
  return (
    <div>
      <div className="teacher_section">
        <Container fluid>
          <div className="group_header">
            <h3>
              {getGroup[0]?.profession + "  N" + getGroup[0]?.groupNumber}{" "}
              Royhati
            </h3>
          </div>
          <div className="single_box">
            <Table hover>
              <thead className="table_head">
                <tr>
                  <th>№</th>
                  <th>{t("worker.w1")}</th>
                  <th>{t("worker.w2")}</th>
                  <th>Baxo</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table_body">
                {allStudent.length
                  ? allStudent
                      ?.sort((a, b) => a?.name?.localeCompare(b?.name))
                      ?.map((a, b) => (
                        <tr className="body_tr" key={b}>
                          <td>
                            <span>{b + 1}</span>
                          </td>
                          <td className="avatar_image">
                            <img
                              src={"http://localhost:4000/" + a?.image}
                              alt="avatar"
                            />
                          </td>
                          <td>
                            <span>
                              {a?.surname} {a?.name}
                            </span>
                          </td>
                          <td>
                            <span>{a?.baho}</span>
                          </td>

                          <td>
                            <span>{a?.description}</span>
                          </td>

                          <td className="icon_link">
                            <span
                              onClick={() => {
                                setCheck(true);
                                getHomeworkOne(a?.homeworkId);
                                setCode(true);
                                sethId(a?.homeworkId);
                                sethomId(a?.gradeId);
                                setImg(a?.image);
                              }}
                            >
                              <img src={Edit} alt="EDIT_ICON" />
                            </span>
                          </td>
                        </tr>
                      ))
                  : "Yordamchi oqtuvchilar yoq"}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>

      {code && (
        <SuperModal
          set={setCode}
          height="88vh"
          maxWidth={830}
          width={700}
          cancel={true}
        >
          <div className="dalete_user">
            <div className="title">
              <h4> {name}ning vazifasi O'zgrtirish</h4>
            </div>
            <div className="dalete_about">
              <img src={"http://localhost:4000/" + homeworkImg} alt="image" />

              <form
                style={{ marginTop: "20px" }}
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="form_control">
                  <input
                    type="number"
                    id="input"
                    placeholder=" Edit Grade"
                    required
                    autoComplete="off"
                    ref={bahoRef}
                  />
                </div>
                <div className="form_control">
                  <textarea
                    placeholder="Edit Description"
                    cols="3"
                    rows="10"
                    ref={descRef}
                  ></textarea>
                </div>

                <button className="mybtn" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </SuperModal>
      )}
      <Toaster />
    </div>
  );
};
