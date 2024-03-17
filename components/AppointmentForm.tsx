import { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr CSS
import dayjs from "dayjs";
import clsx from "clsx";
import { Container } from "./Container";
import { PlusIcon } from "./PlusIcon";
import { Button } from "./Button";
import { useDataStore } from "../providers/dataStore";
import { FormResponse } from "../library/Interface";
import { useDatePicker } from "../helpers/useDatePicker";
import { handleCreateEdit } from "../helpers/apiCalls";
import { Form } from "./Form";
import TextLayout from "./TextLayout";

interface AppointmentFormProps {
  setIsFormOpen: (isOpen: boolean) => void;
  initialFormData?: FormResponse; // Assuming FormResponse is correctly defined elsewhere
  setInitialData?: (data: FormResponse | null) => void; // Optional based on your usage
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  setIsFormOpen,
  initialFormData,
  setInitialData,
}) => {
  const { setRefreshTrigger, setIsLoading } = useDataStore(); // Get the setRefreshTrigger function from the data store
  const [formResponse, setFormResponse] = useState<FormResponse>(
    initialFormData || {}
  ); // Set initial form data if provided for appointment updates
  // Logic to handle the date picker UI
  const startDateTimeRef = useRef(null);
  const endDateTimeRef = useRef(null);
  useDatePicker(startDateTimeRef, endDateTimeRef, setFormResponse); // Use the useDatePicker hook

  // Logic for either submission of the form or cancelling
  const handleCancel = () => {
    setFormResponse({}); // Reset form response
    setIsFormOpen(false);
    setInitialData && setInitialData(null); // Reset initial data
  };

  const handleSubmit = (e) =>
    handleCreateEdit(
      e,
      formResponse,
      setIsLoading,
      setFormResponse,
      setIsFormOpen,
      setRefreshTrigger
    );

  // Define the form sections for maintaining the form state. Easy to add or
  // remove sections
  const sections = {
    header: {
      title: "Appointment",
      description:
        "Save all the relevant information for your next appointment",
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
  };

  return (
    <Container.Flex
      className={{
        position: "absolute top-0 left-0 z-50",
        dimension: "h-screen w-screen",
        background: "bg-green-primary",
        flex: "justify-center items-center",
      }}
    >
      <Form
        className={{
          position: "relative",
          dimension: "h-2/4 p-20",
          border: "rounded-lg shadow-xl shadow-blue-primary",
          background: "bg-white",
          scroll: "overflow-hidden overflow-y-auto scrollbar",
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Button
          variant="callToAction"
          className={{
            dimension: "h-10 w-10",
            position: "rotate-45 absolute -ml-16 -mt-16",
            background: "text-blue-primary",
          }}
          onClick={handleCancel}
        >
          <PlusIcon />
        </Button>
        <Container className="space-y-12 w-[40vw]">
          <Container className="border-b border-gray-900/10 pb-12">
            <TextLayout.Title as="h3" title={sections.header.title} />

            <TextLayout.Paragraph
              paragraph={sections.header.description}
              className="mt-1 text-sm leading-6 text-gray-600"
            />

            {/* Vendor/Buyer Input */}
            <Container.Columns className={{ grid: "grid-cols-2" }}>
              {sections.people.map((section) => (
                <Container
                  key={section.id}
                  className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                >
                  <Container className="sm:col-span-4">
                    <Form.Field
                      section={section.inputs}
                      className={{
                        label:
                          "block text-sm font-medium leading-6 text-gray-900",
                        input: {
                          container:
                            "mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md",
                          inputField:
                            "block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 overflow-x-auto",
                        },
                      }}
                    />
                  </Container>
                </Container>
              ))}
            </Container.Columns>

            {/* Text Input for title */}
            <Container className="mt-10 w-full">
              {sections.text.map((section) => (
                <Form.Field
                  key={section.id}
                  section={section.inputs}
                  className={{
                    label: "block text-sm font-medium leading-6 text-gray-900",
                    input: {
                      container: "mt-2 w-full",
                      inputField:
                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-primary sm:text-sm sm:leading-6",
                    },
                  }}
                />
              ))}
            </Container>

            {/* Date & Time Inputs */}
            <Container className="mt-10">
              {sections.date.map((section) => (
                <Container
                  key={section.id}
                  className="grid grid-cols-2 gap-x-5"
                >
                  <Form.Field
                    section={section.inputs}
                    className={{
                      label:
                        "block text-sm font-medium leading-6 text-gray-900",
                      input: {
                        container:
                          "mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md",
                        inputField:
                          "block overflow-x-auto flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
                      },
                    }}
                  />
                </Container>
              ))}
            </Container>

            {/* Type of Appointment */}
            <Container className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  {sections.type.legend}
                </legend>
                <Container className="mt-2 space-y-6">
                  <Container.Flex
                    className={{
                      flex: "flex-col items-start justify-start",
                      dimension: "h-6",
                    }}
                  >
                    <Form.Field
                      section={sections.type.inputs}
                      check={initialFormData}
                      className={{
                        label: "font-medium text-gray-900 text-sm leading-6",
                        input: {
                          inputField:
                            "h-4 w-4 mr-3 rounded border-gray-300 text-blue-primary focus:ring-blue-primary cursor-pointer",
                        },
                      }}
                    />
                  </Container.Flex>
                </Container>
              </fieldset>
            </Container>

            {/* Location Input */}
            {formResponse.appointmentData?.type === "PHYSICAL" && (
              <Container className="mt-10 w-full">
                {sections.location.map((section) => (
                  <Form.Field
                    key={section.id}
                    section={section.inputs}
                    className={{
                      label:
                        "block text-sm font-medium leading-6 text-gray-900",
                      input: {
                        container: "mt-2 w-full",
                        inputField:
                          "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-primary sm:text-sm sm:leading-6",
                      },
                    }}
                  />
                ))}
              </Container>
            )}
          </Container>
        </Container>

        {/* Form Buttons */}
        <Container.Flex
          className={{
            flex: "flex items-center justify-end gap-x-6",
            dimension: "mt-10 w-[40vw]",
          }}
        >
          <Button
            variant="primary"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="secondary" type="submit">
            Save
          </Button>
        </Container.Flex>
      </Form>
    </Container.Flex>
  );
};

export default observer(AppointmentForm);
