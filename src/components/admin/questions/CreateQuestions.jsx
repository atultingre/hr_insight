import { Button } from "antd";

const CreateQuestions = ({ open, setOpen }) => {
  return (
    <div>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{
          float: "right",
          display: "flex",
          alignItems: "center",
        }}
      >
        Create Questionnaire
      </Button>
    </div>
  );
};

export default CreateQuestions;
