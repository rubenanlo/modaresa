import { useEffect, RefObject } from "react";
import flatpickr from "flatpickr";
import { FormResponse } from "../library/Interface";

export const useDatePicker = (
  startDateTimeRef: RefObject<HTMLInputElement>,
  endDateTimeRef: RefObject<HTMLInputElement>,
  setFormResponse: React.Dispatch<React.SetStateAction<FormResponse>>
): void => {
  useEffect(() => {
    let startDateSelected = null;

    // Initialize start date picker
    const startPicker = flatpickr(startDateTimeRef.current!, {
      enableTime: true,
      dateFormat: "Y-m-d | H:i",
      onChange: (selectedDates) => {
        if (selectedDates[0]) {
          const startDate = selectedDates[0];
          startDateSelected = startDate; // Keep track of the selected start date

          // Automatically set an initial end date 1 hour later than the start date
          const initialEndDate = new Date(startDate.getTime() + 60 * 60 * 1000);

          setFormResponse((prevResponse) => ({
            ...prevResponse,
            appointmentData: {
              ...prevResponse.appointmentData,
              startTime: startDate.toISOString(),
              endTime: initialEndDate.toISOString(), // Update the endTime here as well
            },
          }));

          // Update the endPicker's date to reflect the initial or updated endTime
          endPicker.setDate(initialEndDate, false);
        }
      },
    });

    // Initialize end date picker independently
    const endPicker = flatpickr(endDateTimeRef.current!, {
      enableTime: true,
      dateFormat: "Y-m-d | H:i",
      onChange: (selectedDates) => {
        if (selectedDates[0] && startDateSelected) {
          const endDate = selectedDates[0];

          // Ensure the end date is not before the start date
          if (endDate.getTime() <= startDateSelected.getTime()) {
            alert("End time must be after the start time.");
            return; // Optionally, reset to a valid end time here
          }

          setFormResponse((prevResponse) => ({
            ...prevResponse,
            appointmentData: {
              ...prevResponse.appointmentData,
              endTime: endDate.toISOString(),
            },
          }));
        }
      },
    });

    return () => {
      startPicker.destroy();
      endPicker.destroy();
    };
  }, [startDateTimeRef, endDateTimeRef, setFormResponse]);
};
