# SQL Quest

SQL Quest is a gamified SQL revision web app designed for UK GCSE Computer Science students following the AQA 8525 specification. It runs entirely in the browser, so it can be deployed to GitHub Pages or opened locally with no database server and no backend setup.

## Who It Is For

This tool is intended for:

- GCSE Computer Science teachers who want a quick SQL practice activity
- students revising database query skills independently
- classroom, homework, intervention, or revision-session use

## What The App Covers

SQL Quest focuses on the database and SQL knowledge typically taught within AQA GCSE Computer Science, especially practical querying skills using a relational database model.

The current version covers:

- selecting fields from a table using `SELECT`
- filtering records using `WHERE`
- sorting results using `ORDER BY`
- understanding relational links between tables using `JOIN`
- identifying and using primary keys and foreign keys
- inserting new records using `INSERT INTO`
- modifying existing records using `UPDATE ... SET ... WHERE`
- removing records using `DELETE ... WHERE`

## AQA 8525 Specification Coverage

This project is designed around the AQA GCSE Computer Science (8525) database content, including:

- the purpose and structure of a relational database
- records, fields, and data types
- primary keys and foreign keys
- SQL for searching and amending data
- writing simple relational queries across linked tables

It is especially useful for the database theory and practical SQL elements that appear in:

- classroom teaching of database concepts
- end-of-topic retrieval practice
- revision for written exam questions involving SQL statements

## Level Progression

The app contains five quest levels.

1. `The Retriever`
   Practice basic retrieval using `SELECT ... FROM ... WHERE`.
2. `The Sorter`
   Practice sorting query results with `ORDER BY ... DESC`.
3. `The Relational Link`
   Practice combining two related tables using a join on matching key fields.
4. `The Registrar`
   Practice adding a new record with `INSERT INTO`.
5. `The Modifier & Cleaner`
   Practice editing and deleting records with `UPDATE` and `DELETE`.

## How It Works

Each level starts with a fresh in-memory SQLite database running through `sql.js` in the browser.

For every challenge:

- the app loads the same starting tables and seed data
- the student writes and runs a SQL statement
- the query executes against a real SQLite engine
- the result is checked against the expected answer
- the student can reset the data at any time using `Reset Table`

This means students are working with actual SQL execution rather than keyword matching or regex-based marking.

## Database Structure Used In The App

Each challenge uses two linked tables:

### `Students`

- `StudentID` - integer primary key
- `FirstName` - text
- `LastName` - text
- `YearGroup` - integer
- `HouseID` - integer foreign key

### `Houses`

- `HouseID` - integer primary key
- `HouseName` - text
- `Points` - integer

## How To Use The Tool In Class

Suggested classroom use:

1. Introduce or recap the relevant SQL command.
2. Display the schema preview and discuss how the tables are linked.
3. Ask students to read the mission and write a query.
4. Students click `Run Query` to test their answer.
5. Use the output table and feedback box to discuss mistakes and corrections.
6. Students unlock the next level after a correct solution.

This works well for:

- starter activities
- independent practice
- paired work
- retrieval practice
- homework or flipped learning
- revision lessons before assessment

## Student-Friendly Features

- split-screen layout with the mission on the left and SQL console on the right
- live table preview so students can inspect the starting data
- collapsible AQA syntax cheat sheet
- real SQL execution with friendly error feedback
- reset button for quick retries
- level unlocks for progression and motivation

## Running The Project Locally

### Requirements

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Start The Development Server

```bash
npm run dev
```

Then open the local URL shown in the terminal.

### Build For Production

```bash
npm run build
```

## Deploying To GitHub Pages

The app is configured for static hosting and uses:

- Vite
- React with TypeScript
- Tailwind CSS
- `sql.js` WebAssembly

The Vite config includes `base: './'`, which helps asset paths resolve correctly when the site is hosted on a GitHub Pages subpath.

To deploy:

1. Run `npm run build`
2. Publish the contents of the `dist` folder to GitHub Pages

Because the app is fully client-side, no backend or database server is required.

## Notes For Teachers

- Progress is stored in the browser, so students can continue on the same device.
- Resetting browser storage will remove saved progress.
- The app is best used as a practice and revision tool, not as a secure assessment platform.
- Because it uses SQLite in the browser, students receive authentic query execution feedback.

## Future Extension Ideas

Possible future additions include:

- more query levels
- aggregate functions such as `COUNT`, `AVG`, `SUM`, `MIN`, and `MAX`
- more advanced multi-table challenges
- downloadable teacher worksheets or answer guides
- accessibility and differentiation options

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- `sql.js`
- Zustand
