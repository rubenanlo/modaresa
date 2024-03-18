import dayjs from "dayjs";
// Define the form sections for maintaining the form state. Easy to add or
// remove sections
export const setSections = (
  formResponse,
  setFormResponse,
  startDateTimeRef,
  endDateTimeRef
) => ({
  header: {
    title: "Appointment",
    description: "Save all the relevant information for your next appointment",
  },
  people: [
    {
      id: "Vendor",
      inputs: [
        {
          input: "Vendor",
          showLabel: true,
          placeholder: "Name",
          type: "text",
          required: true,
          value: formResponse.vendorName,
          onChange: (e) =>
            setFormResponse({
              ...formResponse,
              vendorName: e.target.value,
            }),
        },
      ],
    },
    {
      id: "Buyer",
      inputs: [
        {
          input: "Buyer",
          placeholder: "Name",
          showLabel: true,
          type: "text",
          required: true,
          value: formResponse.buyerName,
          onChange: (e) =>
            setFormResponse({
              ...formResponse,
              buyerName: e.target.value,
            }),
        },
        {
          input: "Company name",
          placeholder: "Company name",
          type: "text",
          required: true,
          value: formResponse.companyName,
          onChange: (e) =>
            setFormResponse({
              ...formResponse,
              companyName: e.target.value,
            }),
        },
      ],
      placeholder: ["Name", "Company name"],
    },
  ],
  text: [
    {
      id: "Title",
      inputs: [
        {
          input: "Title",
          showLabel: true,
          placeholder: "Include the title of the appointment",
          type: "text",
          required: true,
          value: formResponse.appointmentData?.title,
          onChange: (e) =>
            setFormResponse({
              ...formResponse,
              appointmentData: {
                ...formResponse.appointmentData,
                title: e.target.value,
              },
            }),
        },
      ],
      placeholder: ["Include the title of the appointment"],
    },
  ],
  date: [
    {
      id: "Time",
      inputs: [
        {
          input: "Starting date & time",
          showLabel: true,
          ref: startDateTimeRef,
          placeholder: "Start Date & Time",
          type: "text",
          required: true,
          // value: formResponse.appointmentData?.startTime,
          InBetweenComponent: formResponse.appointmentData?.startTime && (
            <p className="text-xs">
              {dayjs(formResponse.appointmentData?.startTime).format(
                "MMMM D, YYYY | h:mm A"
              )}
            </p>
          ),

          onChange: (e) =>
            setFormResponse({
              ...formResponse,
              appointmentData: {
                ...formResponse.appointmentData,
                startTime: new Date(e.target.value).toISOString(),
              },
            }),
        },
        {
          input: "Ending date & time",
          showLabel: true,
          ref: endDateTimeRef,
          placeholder: "End Date & Time",
          type: "text",
          required: true,
          // value: formResponse.appointmentData?.endTime,
          InBetweenComponent: formResponse.appointmentData?.endTime && (
            <p className="text-xs">
              {dayjs(formResponse.appointmentData?.endTime).format(
                "MMMM D, YYYY | h:mm A"
              )}
            </p>
          ),
          onChange: (e) =>
            setFormResponse({
              ...formResponse,
              appointmentData: {
                ...formResponse.appointmentData,
                endTime: new Date(e.target.value).toISOString(),
              },
            }),
        },
      ],
    },
  ],
  type: {
    legend: "Type of appointment",
    inputs: [
      {
        input: "PHYSICAL",
        name: "selection", // Add name for radio inputs so that the required attribute works for the entire section
        type: "radio",
        showLabel: true,
        required: true,
        value: "PHYSICAL",
        current: formResponse.appointmentData?.type === "PHYSICAL",
        onChange: (e) =>
          setFormResponse({
            ...formResponse,
            appointmentData: {
              ...formResponse.appointmentData,
              type: e.target.value,
            },
          }),
      },
      {
        input: "VIRTUAL",
        type: "radio",
        name: "selection",
        showLabel: true,
        required: true,
        value: "VIRTUAL",
        current: formResponse.appointmentData?.type === "VIRTUAL",
        onChange: (e) =>
          setFormResponse({
            ...formResponse,
            appointmentData: {
              ...formResponse.appointmentData,
              type: e.target.value,
            },
          }),
      },
    ],
  },
  location: [
    {
      id: "Location",
      inputs: [
        {
          input: "Location (if physical appointment)",
          type: "text",
          placeholder: "Address",
          showLabel: true,
          value: formResponse.appointmentData?.location,
          onChange: (e) =>
            setFormResponse({
              ...formResponse,
              appointmentData: {
                ...formResponse.appointmentData,
                location: e.target.value,
              },
            }),
        },
      ],
    },
  ],
});
