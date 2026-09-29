import type { SqlChallenge, TableName } from "@/types";

export const TABLE_NAMES: TableName[] = ["Students", "Houses"];

export const SCHEMA_SQL = `
CREATE TABLE Houses (
  HouseID INTEGER PRIMARY KEY,
  HouseName TEXT NOT NULL,
  Points INTEGER NOT NULL
);

CREATE TABLE Students (
  StudentID INTEGER PRIMARY KEY,
  FirstName TEXT NOT NULL,
  LastName TEXT NOT NULL,
  YearGroup INTEGER NOT NULL,
  HouseID INTEGER NOT NULL,
  FOREIGN KEY (HouseID) REFERENCES Houses (HouseID)
);
`;

export const SEED_SQL = `
INSERT INTO Houses (HouseID, HouseName, Points) VALUES
  (1, 'Falcon', 120),
  (2, 'Dragon', 185),
  (3, 'Phoenix', 160),
  (4, 'Griffin', 210);

INSERT INTO Students (StudentID, FirstName, LastName, YearGroup, HouseID) VALUES
  (1, 'Mia', 'Patel', 10, 1),
  (2, 'Noah', 'Khan', 11, 2),
  (3, 'Ava', 'Jones', 11, 3),
  (4, 'Leo', 'Smith', 9, 1),
  (5, 'Isla', 'Brown', 10, 4),
  (6, 'Jack', 'Wilson', 11, 2),
  (7, 'Ruby', 'Taylor', 9, 3),
  (8, 'Ethan', 'Ahmed', 10, 4),
  (9, 'Grace', 'Evans', 11, 1);
`;

export interface CheatSheetEntry {
  task: string;
  code: string;
}

export const AQA_CHEAT_SHEET: CheatSheetEntry[] = [
  {
    task: "Choose which fields to show",
    code: "SELECT FirstName, LastName FROM Students;",
  },
  {
    task: "Filter which records come back",
    code: "SELECT * FROM Students WHERE YearGroup = 11;",
  },
  {
    task: "Sort the results",
    code: "SELECT * FROM Houses ORDER BY Points DESC;",
  },
  {
    task: "Link two tables on a key",
    code: "SELECT * FROM Students, Houses WHERE Students.HouseID = Houses.HouseID;",
  },
  {
    task: "Add a new record",
    code: "INSERT INTO Houses (HouseID, HouseName, Points) VALUES (5, 'Otter', 0);",
  },
  {
    task: "Change an existing record",
    code: "UPDATE Houses SET Points = 200 WHERE HouseName = 'Dragon';",
  },
  {
    task: "Remove a record",
    code: "DELETE FROM Students WHERE StudentID = 9;",
  },
  {
    task: "Write a text value",
    code: "WHERE FirstName = 'Alex'",
  },
];

export const CHALLENGES: SqlChallenge[] = [
  {
    id: "level-1",
    level: 1,
    codename: "The Retriever",
    title: "Find the Year 11 students",
    story:
      "Mission Control needs a quick register of every Year 11 learner before mock exams begin.",
    mission:
      "Write a query that shows only the first and last names of students in YearGroup 11.",
    answerType: "select",
    referenceTable: "Students",
    starterQuery: "",
    focus: ["SELECT", "FROM", "WHERE"],
    successMessage:
      "Year 11 register recovered. The next console routine is now unlocked.",
    hint: "Select only the two name fields, then filter rows with WHERE YearGroup = 11.",
    expectedQuery:
      "SELECT FirstName, LastName FROM Students WHERE YearGroup = 11 ORDER BY StudentID;",
    orderMatters: true,
  },
  {
    id: "level-2",
    level: 2,
    codename: "The Sorter",
    title: "Rank the houses by points",
    story:
      "The head of houses wants the leaderboard displayed from highest score to lowest score.",
    mission:
      "Show each house name with its points, sorted in descending order of points.",
    answerType: "select",
    referenceTable: "Houses",
    starterQuery: "",
    focus: ["ORDER BY", "DESC"],
    successMessage:
      "Leaderboard sorted correctly. Relational missions are now available.",
    hint: "Use ORDER BY Points DESC so the highest points appear first.",
    expectedQuery: "SELECT HouseName, Points FROM Houses ORDER BY Points DESC;",
    orderMatters: true,
  },
  {
    id: "level-3",
    level: 3,
    codename: "The Relational Link",
    title: "Match students to their houses",
    story:
      "House mentors need a combined report showing each student beside the house they belong to, using the AQA-style linked-table method with FROM, WHERE, and AND instead of JOIN.",
    mission:
      "Return the first name, last name, and house name for Year 11 students using SELECT, FROM, WHERE, AND, and ORDER BY instead of JOIN.",
    answerType: "select",
    referenceTable: "Students",
    starterQuery: "",
    focus: ["WHERE", "AND", "ORDER BY"],
    successMessage:
      "Foreign-key link established. You can now update the register itself.",
    hint: "List both tables after FROM, match them with Students.HouseID = Houses.HouseID, add AND YearGroup = 11, then sort by LastName ASC.",
    expectedQuery:
      "SELECT Students.FirstName, Students.LastName, Houses.HouseName FROM Students, Houses WHERE Students.HouseID = Houses.HouseID AND Students.YearGroup = 11 ORDER BY Students.LastName ASC;",
    orderMatters: true,
  },
  {
    id: "level-4",
    level: 4,
    codename: "The Registrar",
    title: "Add a new student record",
    story:
      "A new learner has arrived mid-term and the admissions office needs the record inserted safely.",
    mission:
      "Insert Alex Smith into Students with StudentID 10, YearGroup 10, and HouseID 2.",
    answerType: "mutation",
    referenceTable: "Students",
    starterQuery: "",
    focus: ["INSERT INTO", "VALUES"],
    successMessage:
      "New student added. Final admin clean-up missions are now unlocked.",
    hint: "List the Students fields in brackets, then provide matching values in the same order.",
    expectedMutationSql:
      "INSERT INTO Students (StudentID, FirstName, LastName, YearGroup, HouseID) VALUES (10, 'Alex', 'Smith', 10, 2);",
  },
  {
    id: "level-5",
    level: 5,
    codename: "The Modifier & Cleaner",
    title: "Update points and remove a leaver",
    story:
      "Dragon House just earned bonus points, and Ruby Taylor has transferred to another school.",
    mission:
      "Increase Dragon House to 200 points and delete Ruby Taylor from the Students table.",
    answerType: "mutation",
    referenceTable: "Houses",
    starterQuery: "",
    focus: ["UPDATE", "SET", "DELETE"],
    successMessage:
      "Database maintenance complete. SQL Quest is fully mastered.",
    hint: "Use one UPDATE statement and one DELETE statement, each with a precise WHERE clause.",
    expectedMutationSql:
      "UPDATE Houses SET Points = 200 WHERE HouseName = 'Dragon'; DELETE FROM Students WHERE FirstName = 'Ruby' AND LastName = 'Taylor';",
  },
];
