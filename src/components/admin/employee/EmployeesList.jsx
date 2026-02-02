import {
  Button,
  Card,
  Empty,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../../../services/storage.js";
import AddEmployee from "./AddEmployee.jsx";
import BulkEditEmployees from "./BulkEditEmployees.jsx";
import BulkImportEmployees from "./BulkImportEmployees.jsx";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    employee_code: "",
    email: "",
    department: "",
    designation: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [showEmployees, setShowEmployees] = useState(false);

  useEffect(() => {
    setEmployees(storage.get(STORAGE_KEYS.EMPLOYEES, []));
  }, []);

  const saveEmployees = (list) => {
    setEmployees(list);
    storage.set(STORAGE_KEYS.EMPLOYEES, list);
  };

  const addEmployee = () => {
    if (!form.full_name || !form.employee_code || !form.email) {
      message.warning("Name, code and email are required");
      return;
    }

    const employees = storage.get(STORAGE_KEYS.EMPLOYEES, []);
    const users = storage.get(STORAGE_KEYS.USERS, []);

    const exists = employees.some(
      (e) => e.employee_code === form.employee_code,
    );
    if (exists) {
      message.error("Employee code already exists");
      return;
    }

    const employeeId = Date.now();

    const newEmp = {
      id: employeeId,
      full_name: form.full_name,
      employee_code: form.employee_code,
      email: form.email,
      department: form.department,
      designation: form.designation,
      status: "active",
      created_at: new Date().toISOString(),
    };

    const newUser = {
      id: users.length + 1,
      email: form.email,
      password: "password123",
      role: "employee",
      employee_id: employeeId,
      status: "active",
    };

    storage.set(STORAGE_KEYS.EMPLOYEES, [...employees, newEmp]);
    storage.set(STORAGE_KEYS.USERS, [...users, newUser]);

    setEmployees([...employees, newEmp]);

    Modal.info({
      title: "Employee Created",
      content: (
        <>
          <p>Email: {form.email}</p>
          <p>Password: password123</p>
        </>
      ),
    });

    setForm({
      full_name: "",
      employee_code: "",
      email: "",
      department: "",
      designation: "",
    });
  };

  const updateEmployee = () => {
    const updatedEmployees = employees.map((e) =>
      e.id === editingId ? { ...e, ...form } : e,
    );

    const users = storage
      .get(STORAGE_KEYS.USERS, [])
      .map((u) =>
        u.employee_id === editingId ? { ...u, email: form.email } : u,
      );

    storage.set(STORAGE_KEYS.EMPLOYEES, updatedEmployees);
    storage.set(STORAGE_KEYS.USERS, users);

    setEmployees(updatedEmployees);
    setEditingId(null);
    setForm({
      full_name: "",
      employee_code: "",
      email: "",
      department: "",
      designation: "",
    });
    setActiveModal(null);
  };

  const deleteEmployee = (id) => {
    Modal.confirm({
      title: "Delete employee?",
      content: "Delete employee and user account?",
      okType: "danger",
      onOk() {
        const updatedEmployees = employees.filter((e) => e.id !== id);
        const updatedUsers = storage
          .get(STORAGE_KEYS.USERS, [])
          .filter((u) => u.employee_id !== id);

        storage.set(STORAGE_KEYS.EMPLOYEES, updatedEmployees);
        storage.set(STORAGE_KEYS.USERS, updatedUsers);

        setEmployees(updatedEmployees);
      },
    });
  };

  const toggleStatus = (id) => {
    const updatedEmployees = employees.map((e) =>
      e.id === id
        ? { ...e, status: e.status === "active" ? "inactive" : "active" }
        : e,
    );

    const updatedUsers = storage
      .get(STORAGE_KEYS.USERS, [])
      .map((u) =>
        u.employee_id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      );

    storage.set(STORAGE_KEYS.EMPLOYEES, updatedEmployees);
    storage.set(STORAGE_KEYS.USERS, updatedUsers);

    setEmployees(updatedEmployees);
  };

  const filteredEmployees = employees.filter((e) =>
    Object.values(e).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "Code",
      dataIndex: "employee_code",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
      filters: [
        ...new Set(employees.map((e) => e.department).filter(Boolean)),
      ].map((d) => ({ text: d, value: d })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      filters: [
        ...new Set(employees.map((e) => e.designation).filter(Boolean)),
      ].map((d) => ({ text: d, value: d })),
      onFilter: (value, record) => record.designation === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) =>
        status === "active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setEditingId(record.id);
              setForm(record);
              setActiveModal("edit");
            }}
          >
            Edit
          </Button>

          <Button onClick={() => toggleStatus(record.id)}>
            {record.status === "active" ? "Deactivate" : "Activate"}
          </Button>

          <Button danger onClick={() => deleteEmployee(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div
          style={{
            display: "flex",
            float: "right",
            marginBottom: "20px",
            gap: "10px",
          }}
        >
          <Button onClick={() => setActiveModal("bulkEdit")} disabled>
            Bulk Edit
          </Button>
          <Button onClick={() => setActiveModal("bulkImport")}>
            Bulk Import
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setEditingId(null);
              setForm({
                full_name: "",
                employee_code: "",
                email: "",
                department: "",
                designation: "",
              });
              setActiveModal("add");
            }}
          >
            Add Employee
          </Button>
        </div>

        {employees.length === 0 ? (
          <Empty description="No employees" />
        ) : (
          <>
            <Input.Search
              placeholder="Search employees..."
              allowClear
              style={{ width: "100%", marginBottom: 16 }}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Table
              style={{ width: "100%" }}
              rowKey="id"
              columns={columns}
              dataSource={filteredEmployees}
              pagination={{ pageSize: 5 }}
            />
          </>
        )}
      </Card>

      <Modal
        open={!!activeModal}
        onCancel={() => setActiveModal(null)}
        footer={null}
        destroyOnHidden
        width={
          activeModal === "bulkImport" || activeModal === "bulkEdit" ? 600 : 520
        }
        title={
          activeModal === "add"
            ? "Add Employee"
            : activeModal === "edit"
              ? "Update Employee"
              : activeModal === "bulkImport"
                ? "Bulk Import Employees"
                : activeModal === "bulkEdit"
                  ? "Bulk Edit Employees"
                  : ""
        }
      >
        {activeModal === "add" || activeModal === "edit" ? (
          <AddEmployee
            form={form}
            setForm={setForm}
            editingId={editingId}
            updateEmployee={updateEmployee}
            addEmployee={addEmployee}
          />
        ) : null}

        {activeModal === "bulkImport" ? <BulkImportEmployees /> : null}

        {activeModal === "bulkEdit" ? <BulkEditEmployees /> : null}
      </Modal>
    </div>
  );
};

export default EmployeesList;
