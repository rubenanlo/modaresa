import { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr CSS
import clsx from "clsx";
import { Container } from "./Container";
import { PlusIcon } from "./PlusIcon";
import { Button } from "./Button";
import { useDataStore } from "../providers/dataStore";
import { FormResponse } from "../library/Interface";
import { useDatePicker } from "../helpers/useDatePicker";
import { handleCreateEdit } from "../helpers/apiCalls";

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

  return (
    <Container className="absolute top-0 left-0 h-screen w-screen z-50 bg-green-primary flex justify-center items-center">
      <form
        className="relative h-2/4 overflow-hidden overflow-y-auto bg-white p-20 rounded-lg scrollbar shadow-xl shadow-blue-primary"
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
        <div className="space-y-12 w-[40vw]">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Appointment
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Save all the relevant information for your next appointment
            </p>

            <Container.Columns className={{ grid: "grid-cols-2" }}>
              {/* Vendor Input */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Vendor
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md">
                      <input
                        type="text"
                        name="vendorName"
                        id="vendorName"
                        autoComplete="vendorName"
                        value={formResponse.vendorName || ""}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Name"
                        onChange={(e) =>
                          setFormResponse({
                            ...formResponse,
                            vendorName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Buyer Input */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="buyerName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Buyer
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md">
                      <input
                        type="text"
                        name="buyerName"
                        id="buyerName"
                        value={formResponse.buyerName || ""}
                        autoComplete="buyerName"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Name"
                        onChange={(e) =>
                          setFormResponse({
                            ...formResponse,
                            buyerName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md">
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formResponse.companyName || ""}
                        autoComplete="companyName"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Company name"
                        onChange={(e) =>
                          setFormResponse({
                            ...formResponse,
                            companyName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Container.Columns>

            {/* Title Input */}
            <div className=" w-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2 w-full">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formResponse.title}
                  autoComplete="title"
                  placeholder="Include the title of the appointment"
                  onChange={(e) =>
                    setFormResponse({
                      ...formResponse,
                      appointmentData: {
                        ...formResponse.appointmentData,
                        title: e.target.value,
                      },
                    })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Date & Time Inputs */}
            <Container.Columns className={{ grid: "grid-cols-2" }}>
              {/* Starting Date & Time */}
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Starting date & time
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md">
                      <input
                        ref={startDateTimeRef}
                        type="text"
                        name="startTime"
                        id="startTime"
                        className="block overflow-x-auto flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Start Date & Time"
                        value={formResponse.startTime}
                        autoComplete="startDate"
                        onChange={(e) =>
                          setFormResponse({
                            ...formResponse,
                            appointmentData: {
                              ...formResponse.appointmentData,
                              startTime: new Date(e.target.value).toISOString(),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Ending Date & Time */}
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ending date & time
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-primary sm:max-w-md">
                      <input
                        ref={endDateTimeRef}
                        type="text" // Change type to text for Flatpickr
                        name="startTime"
                        id="startTime"
                        className="block overflow-x-auto  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Start Date & Time"
                        autoComplete="endTime"
                        // value={formResponse.startTime || formResponse.endTime}
                        onChange={(e) =>
                          setFormResponse({
                            ...formResponse,
                            appointmentData: {
                              ...formResponse.appointmentData,
                              endTime: new Date(e.target.value).toISOString(),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Container.Columns>

            {/* Type of Appointment */}
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Type of appointment
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="PHYSICAL"
                        name="type"
                        type="radio"
                        value="PHYSICAL"
                        checked={
                          initialFormData && formResponse.type === "PHYSICAL"
                        }
                        className={clsx(
                          formResponse.type === "PHYSICAL"
                            ? "ring-2 ring-inset ring-blue-primary"
                            : "border-gray-300",
                          "h-4 w-4 rounded border-gray-300 text-blue-primary focus:ring-blue-primary"
                        )}
                        onChange={(e) =>
                          setFormResponse({
                            ...formResponse,
                            appointmentData: {
                              ...formResponse.appointmentData,
                              type: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="physical"
                        className="font-medium text-gray-900"
                      >
                        PHYSICAL
                      </label>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="virtual"
                        name="type"
                        type="radio"
                        value="VIRTUAL"
                        checked={
                          initialFormData && formResponse.type === "VIRTUAL"
                        }
                        className={clsx(
                          formResponse.type === "PHYSICAL"
                            ? "ring-2 ring-inset ring-blue-primary"
                            : "border-gray-300",
                          "h-4 w-4 rounded border-gray-300 text-blue-primary focus:ring-blue-primary"
                        )}
                        onChange={(e) =>
                          setFormResponse({
                            ...formResponse,
                            appointmentData: {
                              ...formResponse.appointmentData,
                              type: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="virtual"
                        className="font-medium text-gray-900"
                      >
                        VIRTUAL
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Location Input */}
              <div className=" w-full">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location (if physical appointment)
                </label>
                <div className="mt-2 w-full">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Address"
                    onChange={(e) =>
                      setFormResponse({
                        ...formResponse,
                        appointmentData: {
                          ...formResponse.appointmentData,
                          location: e.target.value,
                        },
                      })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Buttons */}
        <div className="mt-10 flex items-center justify-end gap-x-6 w-[40vw]">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary"
          >
            Save
          </button>
        </div>
      </form>
    </Container>
  );
};

export default observer(AppointmentForm);
