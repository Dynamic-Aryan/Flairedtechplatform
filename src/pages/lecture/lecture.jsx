import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";
import Loading from "../../components/loading/loading";
import toast from "react-hot-toast";
import { SiTicktick } from "react-icons/si";
import { Button, Form, Input, Modal, Upload, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (values) => {
    setBtnLoading(true);
    const myForm = new FormData();

    myForm.append("title", values.title);
    myForm.append("description", values.description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(`${server}/api/course/${params.id}`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div className="bg-gradient-to-t from-slate-50 to-teal-100">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full bg-teal-200 p-2 rounded-md my-2 mx-auto text-center text-white">
            Lecture completed - {completedLec} out of {lectLength} <br />
            <Progress percent={completed} showInfo className="w-full" />
            {completed} %
          </div>

          <div className="flex justify-between min-h-[80vh] flex-col md:flex-row">
            <div className="md:w-[70%] w-full p-2">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                      <video
                        src={`${server}/${lecture.video}`}
                        width={"100%"}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        onEnded={() => addProgress(lecture._id)}
                      ></video>
                      <h1 className="text-xl text-gray-700 text-center mt-4">
                        {lecture.title}
                      </h1>
                      <h3 className="text-lg text-gray-700 text-center mt-2">
                        {lecture.description}
                      </h3>
                    </>
                  ) : (
                    <h1 className="text-xl text-gray-700 text-center">
                      Select a Lecture
                    </h1>
                  )}
                </>
              )}
            </div>

            <div className="md:w-[30%] w-full">
              {user && user.role === "admin" && (
                <Button
                  type="primary"
                  onClick={() => setShow(!show)}
                  className="mb-4 w-full"
                >
                  {show ? "Close" : "Add Lecture +"}
                </Button>
              )}

              <Modal
                title="Add Lecture"
                visible={show}
                onCancel={() => setShow(false)}
                footer={null}
                width={600}
              >
                <Form onFinish={submitHandler}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter the title" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      { required: true, message: "Please enter a description" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Video"
                    name="file"
                    valuePropName="file"
                    rules={[{ required: true, message: "Please upload a video" }]}
                  >
                    <Upload
                      customRequest={changeVideoHandler}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Upload Video</Button>
                    </Upload>
                  </Form.Item>

                  {videoPrev && (
                    <video
                      src={videoPrev}
                      alt="Video Preview"
                      width={300}
                      controls
                      className="mb-4"
                    ></video>
                  )}

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={btnLoading}
                      className="w-full"
                    >
                      {btnLoading ? "Please Wait..." : "Add"}
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>

              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div
                    onClick={() => fetchLecture(e._id)}
                    key={i}
                    className={`bg-white p-3 border border-gray-400 rounded-md mt-2 cursor-pointer text-center ${
                      lecture._id === e._id && "bg-gray-700 text-white"
                    }`}
                  >
                    {i + 1}. {e.title}
                    {progress[0] &&
                      progress[0].completedLectures.includes(e._id) && (
                        <span className="bg-red-600 p-1 rounded-md text-green-400">
                          <SiTicktick />
                        </span>
                      )}
                  </div>
                ))
              ) : (
                <p className="text-center text-lg">No lectures for now</p>
              )}

              {user && user.role === "admin" && (
                <Button
                  type="danger"
                  className="w-full mt-2"
                  onClick={() => deleteHandler(lecture._id)}
                >
                  Delete {lecture.title}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Lecture;
