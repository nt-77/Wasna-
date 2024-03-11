import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

const EditDecor = () => {
  const [name, setName] = useState("");
  const [item_type, setItem_type] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  const newId = id.substring(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/decor/${newId}`)
      .then((response) => {
        setName(response.data.name);
        setItem_type(response.data.item_type);
        setQuantity(response.data.quantity);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", image);
  
    const otherData = {
      name,
      item_type,
      quantity,
    };
  
    // Append other fields to formData manually
    Object.entries(otherData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    setLoading(true);
  
    axios
      .put(`http://localhost:5000/decor/${newId}`, formData)
      .then(() => {
        enqueueSnackbar("Item edited successfully", { variant: "success" });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Could not edit item", { variant: "error" });
        setLoading(false);
      });
  };
  


  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Decor Item</h1>
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
          <label className="text-gray-500 mr-4 text-xl">Item Type</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            onChange={(e) => setItem_type(e.target.value)}
            value={item_type}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Quantity</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Image</label>
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
export default EditDecor;
