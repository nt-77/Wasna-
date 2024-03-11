// Step1.js (similar structure for Step2 and Step3)
import React from 'react';

const Step3 = ({ data, handleChange, prevStep }) => {
  return (
    <div>
      <h2>Step 3:Food selection</h2>
      {/* Add input fields for user information */}
      <button onClick={prevStep}>Back</button>
    </div>
  );
};

export default Step3;
