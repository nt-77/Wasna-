// BookingForm.js
import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
// import Confirmation from './Confirmation';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    bookingDate: '',
    eventDate: '',
    venue: '',
    decor: '',
    guests: '',
    eventType: '',
    eventTime: '',
    menuNumber: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input, value) => {
    setFormData({ ...formData, [input]: value });
  };

  const getStepComponent = () => {
    switch (step) {
      case 1:
        return <Step1 data={formData} handleChange={handleChange} nextStep={nextStep} />;
      case 2:
        return <Step2 data={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 data={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
      // case 4:
        // return <Confirmation data={formData} />;
      default:
        return null;
    }
  };

  return <div>{getStepComponent()}</div>;
};

export default BookingForm;
