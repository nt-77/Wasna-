import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Createbook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully',{variant:'success'})
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Could not create book',{variant:'error'})
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="border-2 flex flex-col border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Title</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Author</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Publish Year</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="number"
            onChange={(e) => setPublishYear(e.target.value)}
            value={publishYear}
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>
          save
        </button>
      </div>
    </div>
  );
};

export default Createbook;
