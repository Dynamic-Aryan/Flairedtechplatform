import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";
import Loading from "../../components/loading/loading";
import toast from "react-hot-toast";
import { SiTicktick } from "react-icons/si";

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
  const changeVideoHandler = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = ()=>{
      setVideoPrev(reader.result)
      setVideo(file);
    }
  }
  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description",description);
    myForm.append("file",video);

    try{
       const {data} = await axios.post(`${server}/api/course/${params.id}`, myForm,{
        headers:{
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
    }catch(error){
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler= async(id)=>{
    if(confirm("Are you sure you want to delete this lecture")){
      try{
          const {data} = await axios.delete(`${server}/api/lecture/${id}`,{
            headers:{
              token: localStorage.getItem("token"),
            },
          });
          toast.success(data.message);
          fetchLectures();
      }catch(error){
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
    <div className="bg-gradient-to-t from-[rgb(55,56,56)] to-[#858585]" >
      {loading ? (
        <Loading />
      ) : (
        <>
        <div className="w-full bg-gray-800 p-2 rounded-md my-2 mx-auto text-center text-white">
            Lecture completed - {completedLec} out of {lectLength} <br />
            <progress value={completed} max={100} className="w-full"></progress>{" "}
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
                        onEnded={()=>addProgress(lecture._id)}
                      ></video>
                      <h1 className="text-xl text-gray-700 text-center">
                        {lecture.title}
                      </h1>
                      <h3 className="text-lg text-gray-700 text-center">
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
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Close" : "Add Lecture +"}
                </button>
              )}
              {show && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl text-gray-700 mb-4 text-center">
                    Add Lectures
                  </h2>
                  <form onSubmit={submitHandler} className="text-left">
                    <label htmlFor="text" className="block mb-1 text-sm">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full p-2 mb-4 border border-black rounded-md"
                    />

                    <label htmlFor="text" className="block mb-1 text-sm">
                      Description
                    </label>
                    <input
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      required
                      className="w-full p-2 mb-4 border border-black rounded-md"
                    />

                    <input 
                    type="file" 
                    placeholder="Choose Video" 
                    onChange={changeVideoHandler} 
                    required 

                    />
                    {
                      videoPrev && <video src={videoPrev} alt="" width={300} controls></video>
                    }
                    <button
                     disabled={btnLoading}
                      type="submit"
                      className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
                    >
                      {btnLoading ?"Please Wait...":"Add"}
                    </button>
                  </form>
                </div>
              )}

              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <>
                    <div
                      onClick={() => fetchLecture(e._id)}
                      key={i}
                      className={`bg-white p-3 border border-black rounded-md mt-2 cursor-pointer text-center ${
                        lecture._id === e._id && "bg-gray-700 text-white"
                      }`}
                    >
                      {i + 1}.{e.title}
                      {progress[0] &&
                        progress[0].completedLectures.includes(e._id) && (
                          <span className="bg-red-600 p-1 rounded-md text-green-400">
                            <SiTicktick />
                          </span>
                        )}
                    </div>
                    {user && user.role === "admin" && (
                      <button
                        className="bg-red-400 text-white px-4 py-2 rounded-md w-full mt-2"
                        style={{ background: "red" }}
                        onClick={()=>deleteHandler(e._id)}
                      >
                        Delete {e.title}
                      </button>
                    )}
                  </>
                ))
              ) : (
                <p className="text-center text-lg">No lectures for now</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Lecture;
