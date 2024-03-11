import { Container } from "./Container";
import { useState } from "react";
import { PlusIcon } from "./PlusIcon";
import { Button } from "./Button";

interface FormResponse {
  appointmentId?: string; // Add appointmentId to the FormResponse interface
  vendorName?: string;
  buyerName?: string;
  companyName?: string;
  appointmentData?: {
    title?: string;
    type?: string;
    location?: string;
    startTime?: string;
    endTime?: string;
  };
}

interface AppointmentFormProps {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialFormData?: FormResponse; // Add initialFormData prop to receive data for update
  onAppointmentAdded: () => void; // Define callback function prop
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  setIsFormOpen,
  initialFormData,
  onAppointmentAdded, // Define callback function prop
}) => {
  const [formResponse, setFormResponse] = useState<FormResponse>(
    initialFormData || {}
  ); // Set initial form data if provided

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = formResponse.appointmentId ? "PUT" : "POST"; // Determine method based on the presence of appointmentId
    const url = formResponse.appointmentId
      ? `/api/update-appointment`
      : `/api/create-appointment`; // Set endpoint based on method

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formResponse),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      setFormResponse({});
      setIsFormOpen(false);
      onAppointmentAdded(); // Call callback function prop
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the appointment.");
    }
  };

  return (
    <Container className="absolute top-0 left-0 h-screen w-screen z-50 bg-green-primary flex justify-center items-center">
      <form
        className="relative h-2/4 overflow-hidden overflow-y-auto bg-white p-20 rounded-lg scrollbar shadow-xl shadow-blue-primary"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Button
          className={{
            dimension: "h-10 w-10",
            position: "rotate-45 absolute -ml-16 -mt-16",
            background: "text-blue-primary",
          }}
          onClick={() => setIsFormOpen(false)}
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
                        type="datetime-local"
                        name="startDate"
                        id="startDate"
                        autoComplete="startDate"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Name"
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
                        type="datetime-local"
                        name="endTime"
                        id="endTime"
                        autoComplete="endTime"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Name"
                        onChange={(e) =>
                          setFormResponse({
                            ...formResponse,
                            appointmentData: {
                              ...formResponse.appointmentData,
                              endTime: new Date(e.target.value).toISOString(),
                            },
                          })
                        }
                        onBlur={(e) => {
                          const startTime = new Date(
                            formResponse.appointmentData.startDate!
                          );
                          const endTime = new Date(e.target.value);
                          if (
                            startTime.getFullYear() !== endTime.getFullYear() ||
                            startTime.getMonth() !== endTime.getMonth() ||
                            startTime.getDate() !== endTime.getDate()
                          ) {
                            alert(
                              "Ending date must be on the same day as the starting date."
                            );
                          }
                        }}
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
                        id="physical"
                        name="physical"
                        type="checkbox"
                        value="PHYSICAL"
                        className="h-4 w-4 rounded border-gray-300 text-blue-primary focus:ring-blue-primary"
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
                        name="virtual"
                        type="checkbox"
                        value="VIRTUAL"
                        className="h-4 w-4 rounded border-gray-300 text-blue-primary focus:ring-blue-primary"
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
            onClick={() => setIsFormOpen(false)}
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

export default AppointmentForm;
