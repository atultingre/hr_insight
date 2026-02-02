import { Divider } from "antd";
import { useEffect, useState } from "react";
import QuestionnaireBuilder from "../../../pages/hr/QuestionnaireBuilder";
import { storage, STORAGE_KEYS } from "../../../services/storage";
import CreateQuestions from "./CreateQuestions";
import Questions from "./Questions";

const QuestionsDashboard = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [open, setOpen] = useState(false);

  // Load questionnaires from localStorage
  useEffect(() => {
    const data = storage.get(STORAGE_KEYS.QUESTIONNAIRES, []);
    setQuestionnaires(data);
  }, [open]);

  return (
    <div>
      <CreateQuestions open={open} setOpen={setOpen} />
      <Divider />
      <Questions
        questionnaires={questionnaires}
        setQuestionnaires={setQuestionnaires}
      />

      <QuestionnaireBuilder open={open} setOpen={setOpen} />
    </div>
  );
};

export default QuestionsDashboard;
