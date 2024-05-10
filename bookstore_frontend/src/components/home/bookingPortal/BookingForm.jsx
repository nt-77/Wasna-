// BookingForm.js
import  {  useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Logout from "../../../pages/users/Logout";
import ConfirmEvent from "./ConfirmEvent";
import Navbar from '../../../nav/Navbar'
import personalInfo from '../../../assets/personalInfo.svg'
// import Confirmation from './Confirmation';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [customMenu, setCustomMenu] = useState("");
  const [decor, setDecor] = useState({});


  const [formData, setFormData] = useState({
    name: "",
    contactNumber:"" ,
    email: "",
    eventDate: "",
    venue: "",
    guests: "",
    event_type: "",
    eventTime: ""
  });
  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input, value) => {
    setFormData({ ...formData, [input]: value });
  };

  const getStepComponent = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            data={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            setDecor={setDecor}
            data={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            setCustomMenu={setCustomMenu}
          />
        );
      case 3:
        return (
          <Step3
            data={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      // case 4:
      // return <Confirmation data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col lg:flex-row lg:w-4/5 bg-white justify-center items-center p-4">
        <img
          src={personalInfo}
          alt="Login Visual"
          className="w-3/5 lg:w-2/5 object-cover mb-4 lg:mb-0 lg:mr-4 p-4"
        />

        </div>
      {getStepComponent()}
      {!isObjectEmpty(decor) && <ConfirmEvent customMenu={customMenu} decor={decor} formData={formData} />}
    </div>
  );
};

export default BookingForm;

