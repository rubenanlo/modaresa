import { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr CSS
import { Container } from "./Container";
import { PlusIcon } from "./PlusIcon";
import { Form } from "./Form";
import TextLayout from "./TextLayout";
import { Button } from "./Button";
import { useDatePicker } from "../helpers/useDatePicker";
import { handleCreateEdit } from "../helpers/apiCalls";
import { FormResponse } from "../library/Interface";
import { useDataStore } from "../providers/dataStore";
import { setSections } from "../library/form";

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

  const sections = setSections(
    formResponse,
    setFormResponse,
    startDateTimeRef,
    endDateTimeRef
  );

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
                            "mt-2 flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md",
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
                        "block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-primary sm:text-sm sm:leading-6",
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
                          "mt-2 flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md",
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
                          "block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-primary sm:text-sm sm:leading-6",
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
