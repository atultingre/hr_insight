import React, { useState } from "react";
import { Button, Modal } from "antd";
import QuestionnaireBuilder from "../../pages/hr/QuestionnaireBuilder";

const CreateQuestions = () => {
  const [open, setOpen] = useState(false);

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

      <QuestionnaireBuilder open={open} setOpen={setOpen} />
    </div>
  );
};

export default CreateQuestions;
;
