import React, { createContext, useContext, useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../services/storage";

const AuthContext = createContext();

const seedInitialData = () => {
if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
  storage.set(STORAGE_KEYS.USERS, [
    {
      id: 1,
      email: "employee@company.com",
      password: "employee123",
      role: "employee",
      employee_id: 101,
      status: "active",
    },
    {
      id: 2,
      email: "admin@company.com",
      password: "admin123",
      role: "admin",
      employee_id: 1,
      status: "active",
    },
    {
      id: 3,
      email: "viewer@company.com",
      password: "viewer123",
      role: "viewer",
      employee_id: 2,
      status: "active",
    },
  ]);
}


  if (!localStorage.getItem(STORAGE_KEYS.QUESTIONNAIRES))
    storage.set(STORAGE_KEYS.QUESTIONNAIRES, []);

  if (!localStorage.getItem(STORAGE_KEYS.TARGETS))
    storage.set(STORAGE_KEYS.TARGETS, []);

  if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS))
    storage.set(STORAGE_KEYS.SUBMISSIONS, []);
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("auth_user");
      return null;
    }
  });

  useEffect(() => {
    seedInitialData();
  }, []);

  const login = (email, password) => {
    const users = storage.get(STORAGE_KEYS.USERS, []);

    const found = users.find(
      (u) =>
        u.email === email && u.password === password && u.status === "active",
    );

    if (!found) {
      throw new Error("Invalid email or password");
    }

    const authUser = {
      id: found.id,
      email: found.email,
      role: found.role,
      employee_id: found.employee_id,
    };

    localStorage.setItem("auth_user", JSON.stringify(authUser));
    setUser(authUser);
    return authUser;
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
