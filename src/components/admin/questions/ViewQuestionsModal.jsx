import {
  Modal,
  Card,
  Space,
  Button,
  Typography,
  Empty,
  Popconfirm,
} from "antd";

const { Text } = Typography;

const ViewQuestionsModal = ({
  open,
  onClose,
  questionnaire,
  onEdit,
  onDelete,
  onAddQuestion,
}) => {
  return (
    <Modal
      title={`Questions – ${questionnaire.title}`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {questionnaire.questions.length === 0 ? (
        <Empty description="No questions added" />
      ) : (
        <Space orientation="vertical" style={{ width: "100%" }}>
          {questionnaire.questions.map((q, index) => (
            <Card key={q.id} size="small">
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <div>
                  <Text strong>
                    {index + 1}. {q.question_text}
                  </Text>
                  <br />
                  <Text type="secondary">
                    {q.question_type} - {" "}
                    {q.is_required ? "Required" : "Optional"}
                  </Text>
                </div>

                <Space>
                  <Button size="small" onClick={() => onEdit(q)}>
                    Edit
                  </Button>
                  <Popconfirm
                    title="Delete question?"
                    description="This action cannot be undone."
                    okText="Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                    onConfirm={() => onDelete(questionnaire.id, q.id)}
                  >
                    <Button danger size="small">
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              </Space>
            </Card>
          ))}
          <Button type="primary" block onClick={onAddQuestion}>
            Add Question
          </Button>
        </Space>
      )}
    </Modal>
  );
};

export default ViewQuestionsModal;
