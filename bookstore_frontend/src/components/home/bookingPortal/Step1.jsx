// Step1.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Step1 = ({ data, handleChange, nextStep }) => {
  const {
    name,
    contactNumber,
    email,
    event_type,
    eventDate,
    guests,
    selectedVenues: initialSelectedVenues = [],
    eventTime,
  } = data;
  const [selectedVenues, setSelectedVenues] = useState(initialSelectedVenues);
  const [errors, setErrors] = useState({});
  const [newEventDate,setNewEventData]=useState()

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!contactNumber.trim()) {
      errors.contactNumber = "Contact Number is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!event_type.trim()) {
      errors.event_type = "Event type is required";
    }

    if (!eventDate) {
      errors.eventDate = "Date of Event is required";
    }

    if (!guests) {
      errors.guests = "Number of Guests is required";
    } else if (guests > 500 && selectedVenues.length < 2) {
      errors.guests = "For more than 500 guests, select at least two venues";
    } else if (guests <= 500 && selectedVenues.length > 1) {
      errors.guests = "For 500 or fewer guests, select only one venue";
    }

    if (selectedVenues.length === 0) {
      errors.venue = "At least one venue is required";
    }

    if (!eventTime) {
      errors.eventTime = "Time of Event is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const handleNext = () => {
  //   if (validateForm()) {
  //     nextStep();
  //   }
  // };

  const handleNext = () => {
    if (validateForm()) {
      // Check if the selected date, time, and venue combination is already booked
      const isBookingConflict =
        eventTime === "Lunch" && selectedVenues.includes("Marquee 1");

      if (isBookingConflict) {
        setErrors({
          bookingConflict:
            "This date and time for Marquee 1 is already booked.",
        });
      } else {
        // Clear the booking conflict error if not applicable
        setErrors({});

        // Proceed to the next step
        nextStep();
      }
    }
  };

  const handleVenueChange = (venue) => {
    const updatedVenues = selectedVenues.includes(venue)
      ? selectedVenues.filter((v) => v !== venue)
      : [...selectedVenues, venue];

    setSelectedVenues(updatedVenues);
    console.log("updatedVenues",updatedVenues);
    handleChange("venue", updatedVenues);
  
  };

  const handleChangeOfDate = (field, value) => {

        const isoDateString = value.toISOString().split('T')[0]; // Convert date object to ISO string.

        setNewEventData(prevState => ({
            ...prevState,
            [field]: isoDateString
        }));

        handleChange("eventDate", isoDateString);
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Step 1: User Information</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.name && "border-red-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.contactNumber && "border-red-500"
            }`}
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.email && "border-red-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="event_type"
            className="block text-sm font-medium text-gray-600"
          >
            Type of Event
          </label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Barat"
                checked={event_type === "Barat"}
                onChange={() => handleChange("event_type", "Barat")}
              />
              <span className="ml-2">Barat</span>
            </label>

            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Walima"
                checked={event_type === "Walima"}
                onChange={() => handleChange("event_type", "Walima")}
              />
              <span className="ml-2">Walima</span>
            </label>

            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Dholki"
                checked={event_type === "Dholki"}
                onChange={() => handleChange("event_type", "Dholki")}
              />
              <span className="ml-2">Dholki</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Mehndi"
                checked={event_type === "Mehndi"}
                onChange={() => handleChange("event_type", "Mehndi")}
              />
              <span className="ml-2">Mehndi</span>
            </label>

            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="other"
                checked={event_type === "other"}
                onChange={() => handleChange("event_type", "other")}
              />
              <span className="ml-2">other</span>
            </label>
          </div>

          {errors.event_type && (
            <p className="text-red-500 text-xs mt-1">{errors.event_type}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="eventDate"
            className="block text-sm font-medium text-gray-600"
          >
            Date of Event
          </label>
          <DatePicker
            id="eventDate"
            selected={eventDate}
            onChange={(date) => handleChangeOfDate("eventDate", date)}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.eventDate && "border-red-500"
            }`}
          />
          {errors.eventDate && (
            <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Venue
          </label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className={`form-checkbox text-blue-500 ${
                  errors.selectedVenues && "border-red-500"
                }`}
                value="Marquee 1"
                checked={selectedVenues.includes("Marquee 1")}
                onChange={() => handleVenueChange("Marquee 1")}
              />
              <span className="ml-2">Marquee 1</span>
            </label>

            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                className={`form-checkbox text-blue-500 ${
                  errors.selectedVenues && "border-red-500"
                }`}
                value="Marquee 2"
                checked={selectedVenues.includes("Marquee 2")}
                onChange={() => handleVenueChange("Marquee 2")}
              />
              <span className="ml-2">Marquee 2</span>
            </label>

            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                className={`form-checkbox text-blue-500 ${
                  errors.selectedVenues && "border-red-500"
                }`}
                value="Lawn"
                checked={selectedVenues.includes("Lawn")}
                onChange={() => handleVenueChange("Lawn")}
              />
              <span className="ml-2">Lawn</span>
            </label>
          </div>
          {errors.venue && (
            <p className="text-red-500 text-xs mt-1">{errors.selectedVenues}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Time of Event
          </label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Lunch"
                checked={eventTime === "Lunch"}
                onChange={() => handleChange("eventTime", "Lunch")}
              />
              <span className="ml-2">Lunch</span>
            </label>

            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="Dinner"
                checked={eventTime === "Dinner"}
                onChange={() => handleChange("eventTime", "Dinner")}
              />
              <span className="ml-2">Dinner</span>
            </label>
          </div>
          {errors.eventTime && (
            <p className="text-red-500 text-xs mt-1">{errors.eventTime}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-600"
          >
            Number of Guests
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => handleChange("guests", e.target.value)}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.guests && "border-red-500"
            }`}
          />
          {errors.guests && (
            <p className="text-red-500 text-xs mt-1">{errors.guests}</p>
          )}
        </div>
        {errors.bookingConflict && (
          <p className="text-red-500 text-xs mt-1">{errors.bookingConflict}</p>
        )}
        <button
          type="button"
          onClick={handleNext}
          // className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          disabled={Object.keys(errors).length > 0} // Disable the button if there are errors
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Step1;
