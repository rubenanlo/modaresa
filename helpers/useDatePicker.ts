import { useEffect, RefObject } from "react";
import flatpickr from "flatpickr";
import { FormResponse } from "../library/Interface";

export const useDatePicker = (
  startDateTimeRef: RefObject<HTMLInputElement>,
  endDateTimeRef: RefObject<HTMLInputElement>,
  setFormResponse: React.Dispatch<React.SetStateAction<FormResponse>>
): void => {
  useEffect(() => {
    // Initialize start date picker
    const startPicker = flatpickr(startDateTimeRef.current!, {
      enableTime: true,
      dateFormat: "Y-m-d  |  H:i",
      onChange: (selectedDates) => {
        if (selectedDates[0]) {
          const startDate = selectedDates[0];
          const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

          setFormResponse((prevResponse) => ({
            ...prevResponse,
            appointmentData: {
              ...prevResponse.appointmentData,
              startTime: startDate.toISOString(),
              // Optionally update endTime here
            },
          }));
        }
      },
    });

    // Initialize end date picker independently
    const endPicker = flatpickr(endDateTimeRef.current!, {
      enableTime: true,
      dateFormat: "Y-m-d  |  H:i",
      // Set a defaultDate only if it's a new appointment or logic requires
      onChange: (selectedDates) => {
        if (selectedDates[0]) {
          const endDate = selectedDates[0];
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
