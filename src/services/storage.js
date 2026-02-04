// ========================
// src/services/storage.js
// Central localStorage helper (single source of truth)
// ========================
export const storage = {
  get(key, fallback = []) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

// ========================
// Storage Keys
// ========================
export const STORAGE_KEYS = {
  QUESTIONNAIRES: "questionnaires",
  SUBMISSIONS: "submissions",
  EMPLOYEES: "employees",
  USERS: "users",
  TARGETS: "questionnaire_targets",
};

// ========================
// Patch QuestionnaireBuilder to persist data
// ========================
// inside saveQuestionnaire()
// replace console.log with:
/*
const existing = storage.get(STORAGE_KEYS.QUESTIONNAIRES);
storage.set(STORAGE_KEYS.QUESTIONNAIRES, [
  ...existing,
  {
    id: Date.now(),
    title,
    description,
    questions,
    created_at: new Date().toISOString(),
  },
]);
*/

// ========================
// Patch QuestionnaireFillForm submission save
// ========================
// inside onSubmit()
/*
const existing = storage.get(STORAGE_KEYS.SUBMISSIONS);
storage.set(STORAGE_KEYS.SUBMISSIONS, [
  ...existing,
  {
    id: Date.now(),
    questionnaire_id: questionnaire.id,
    employee_id: questionnaire.employee_id,
    submitted_at: new Date().toISOString(),
    answers: questionnaire.questions.map((q) => ({
      question_id: q.id,
      answer_json: data[`q_${q.id}`],
    })),
  },
]);
*/

// ========================
// Patch SubmissionHistory to read from storage
// ========================
// replace dummyHistory with:
/*
const user = useAuth().user;
const all = storage.get(STORAGE_KEYS.SUBMISSIONS);
const myHistory = all.filter(s => s.employee_id === user.employee_id);
*/

// ========================
// Patch SubmissionList (HR) to read from storage
// ========================
/*
const submissions = storage.get(STORAGE_KEYS.SUBMISSIONS);
*/
