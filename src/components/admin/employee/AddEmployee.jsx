import { Form, Input, Button, Space, Typography } from "antd";

const { Title } = Typography;

export default function AddEmployee({
  form,
  setForm,
  editingId,
  updateEmployee,
  addEmployee,
}) {
  return (
    <div>
      {/* <Title level={4}>Manage Employees</Title> */}

      <Form layout="vertical">
        <Form.Item label="Full Name" required>
          <Input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Employee Code" required>
          <Input
            placeholder="Employee Code"
            value={form.employee_code}
            disabled={!!editingId} // optional UX improvement
            onChange={(e) =>
              setForm({ ...form, employee_code: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Email" required>
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Department">
          <Input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Designation">
          <Input
            placeholder="Designation"
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={editingId ? updateEmployee : addEmployee}
            >
              {editingId ? "Update Employee" : "Add Employee"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
