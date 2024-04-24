// BookingForm.js
import  {  useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Logout from "../../../pages/users/Logout";
import ConfirmEvent from "./ConfirmEvent";
// import Confirmation from './Confirmation';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [customMenu, setCustomMenu] = useState("");
  const [decor, setDecor] = useState({});

  // const [eventDetails, setEventDetails] = useState({});

// const updateEventDetails = (d,c) => {
//   setEventDetails({
//       customMenu:c,
//       decor: d
//   });
//   console.log("eventDetails",eventDetails);
// };

  // console.log(decor);
  const [formData, setFormData] = useState({
    // name: "",
    // contactNumber ,
    // email: "",
    // eventDate: "",
    // venue: "",
    // guests: "",
    // event_type: "",
    // eventTime: ""
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
      <Logout />
      {getStepComponent()}
      {!isObjectEmpty(decor) && <ConfirmEvent customMenu={customMenu} decor={decor} formData={formData} />}
    </div>
  );
};

export default BookingForm;

