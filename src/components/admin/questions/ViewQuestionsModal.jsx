import { Modal, Card, Space, Button, Typography, Empty } from "antd";

const { Text } = Typography;

const ViewQuestionsModal = ({
  open,
  onClose,
  questionnaire,
  onEdit,
  onDelete,
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
        <Space direction="vertical" style={{ width: "100%" }}>
          {questionnaire.questions.map((q, index) => (
            <Card key={q.id} size="small">
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <div>
                  <Text strong>
                    {index + 1}. {q.question_text}
                  </Text>
                  <br />
                  <Text type="secondary">
                    {q.question_type} •{" "}
                    {q.is_required ? "Required" : "Optional"}
                  </Text>
                </div>

                <Space>
                  <Button size="small" onClick={() => onEdit(q)}>
                    Edit
                  </Button>
                  <Button
                    danger
                    size="small"
                    onClick={() => onDelete(questionnaire.id, q.id)}
                  >
                    Delete
                  </Button>
                </Space>
              </Space>
            </Card>
          ))}
        </Space>
      )}
    </Modal>
  );
};

export default ViewQuestionsModal;
