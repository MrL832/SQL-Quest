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
- understanding relational links between tables by matching foreign keys to primary keys
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
- the student can reset the data at any time using `Reset data`

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
4. Students click `Run query` (or press `Ctrl`/`Cmd` + `Enter`) to test their answer.
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

- light, dark, and system colour themes, remembered between visits
- split-screen layout with the mission on the left and SQL editor on the right
- live table preview so students can inspect the starting data
- hints hidden behind a "Stuck?" toggle, so students attempt the query first
- collapsible AQA syntax cheat sheet
- real SQL execution with friendly error feedback
- reset button for quick retries
- level unlocks for progression and motivation
- responsive layout that works on tablets and phones

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
- Tailwind CSS v4
- shadcn/ui
- `sql.js` WebAssembly

This repository is set up to deploy to GitHub Pages from the `main` branch using GitHub Actions.

The current Vite config uses:

```ts
base: '/SQL-Quest/'
```

This matches the project site URL:

- `https://mrl832.github.io/SQL-Quest/`

### One-Time GitHub Setup

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Under `Source`, choose `GitHub Actions`.
4. Make sure the repository default branch is `main`.

### Deployment Workflow

The workflow file is stored at:

- `.github/workflows/deploy.yml`

On every push to `main`, GitHub Actions will:

- install dependencies with `npm ci`
- build the app with `npm run build`
- publish the `dist` folder to GitHub Pages

### Release Steps

To publish a new release:

1. Run `npm run build` locally to confirm the production build works.
2. Commit your changes.
3. Push to `main`.
4. Open the `Actions` tab on GitHub and wait for the deploy workflow to finish.
5. Open the GitHub Pages site URL and test the live version.

Because the app is fully client-side, no backend or database server is required.

### Pre-Release Checklist

Before pushing a release, it is worth checking:

- the site loads correctly from the GitHub Pages URL
- all five levels can be opened and completed
- `Run query` and `Reset data` both work
- light, dark, and system themes all render correctly
- the SQLite `.wasm` asset loads correctly in production
- browser refresh does not break navigation or assets
- the README and repository description are up to date

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
- Tailwind CSS v4
- shadcn/ui (Base UI primitives)
- Lucide React
- `sql.js`
- Zustand

### Theming

The interface is built on shadcn/ui semantic colour tokens (`background`, `card`,
`primary`, `muted`, `destructive`, `success`) defined in `src/index.css`. Light and dark
values live in the `:root` and `.dark` blocks, so changing a colour in one place updates
both the components and the charts that use it. To restyle the app, edit those tokens
rather than adding per-component colour classes.

Adding a shadcn component:

```
npx shadcn@latest add <component>
```
