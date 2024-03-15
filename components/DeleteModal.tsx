import TextLayout from "./TextLayout";
import { Button } from "./Button";
import { Container } from "./Container";
import { useDataStore } from "../providers/dataStore";
import { handleDelete } from "../helpers/apiCalls";

interface DeleteModalProps {
  appointmentId: number;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal: DeleteMReact.FC<DeleteModalProps> = ({
  appointmentId,
  setOpenDeleteModal,
}) => {
  const { setRefreshTrigger, setIsLoading } = useDataStore();

  const handleCancel = () => {
    setOpenDeleteModal(false);
  };

  return (
    <Container.Flex
      className={{
        position: "fixed top-0 left-0 z-50",
        dimension: "h-screen w-screen",
        backgreound: "",
        flex: "justify-center items-center",
      }}
    >
      <Container.Flex
        className={{
          dimension: "h-52 p-10",
          rounded: "rounded-xl",
          background: "bg-blue-primary",
          shadow: "shadow-2xl",
          flex: "flex-col justify-around",
        }}
      >
        <TextLayout.Title
          as="h3"
          title="Are you sure you want to delete this appointment"
          className="text-gray-200"
        />
        <Container.Flex className={{ flex: "justify-center gap-x-10" }}>
          <Button onClick={() => handleCancel()}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() =>
              handleDelete(
                appointmentId,
                setOpenDeleteModal,
                setRefreshTrigger,
                setIsLoading
              )
            }
          >
            Delete
          </Button>
        </Container.Flex>
      </Container.Flex>
    </Container.Flex>
  );
};

export default DeleteModal;
