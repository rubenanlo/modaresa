import { useEffect, RefObject } from "react";
import flatpickr from "flatpickr";
import { FormResponse } from "../library/Interface";

export const useDatePicker = (
  startDateTimeRef: RefObject<HTMLInputElement>,
  endDateTimeRef: RefObject<HTMLInputElement>,
  setFormResponse: React.Dispatch<React.SetStateAction<FormResponse>>
): void => {
  useEffect(() => {
    let endPicker: flatpickr.Instance | undefined;

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
              endTime: endDate.toISOString(), // Set endTime in your form state here
            },
          }));

          if (endPicker) {
            endPicker.setDate(endDate, false);
          } else {
            endPicker = flatpickr(endDateTimeRef.current!, {
              enableTime: true,
              dateFormat: "Y-m-d  |  H:i",
              defaultDate: endDate,
            });
          }
        }
      },
    });

    return () => {
      startPicker.destroy();
      endPicker?.destroy();
    };
  }, [startDateTimeRef, endDateTimeRef, setFormResponse]); // Include refs and setter in dependencies if their identities can change
};
