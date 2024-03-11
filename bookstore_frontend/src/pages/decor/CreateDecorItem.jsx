import { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateDecorItem = () => {
  const [name, setName] = useState("");
  const [item_type, setItem_type] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("item_type", item_type);
    formData.append("quantity", quantity);
    formData.append("image", image);
  
    setLoading(true);
    axios
      .post("http://localhost:5000/decor/adddecoritem", formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Decor item created successfully', { variant: 'success' })
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Could not create decor item', { variant: 'error' })
        setLoading(false);
      });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Decor Item</h1>
      {loading ? <Spinner /> : ""}
      <div className="border-2 flex flex-col border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Name</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Item type</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            onChange={(e) => setItem_type(e.target.value)}
            value={item_type}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Item quantity</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Add Image</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="file"
            accept="image/*"
            onChange={handleImageChange} 
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>
          save
        </button>
      </div>
    </div>
  );
};

export default CreateDecorItem;
