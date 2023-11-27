# TASK MANAGEMENT APP

## Description

This is a task management app that allows users to create, read, update and delete tasks.
A Task can be assigned to many users with many projects

## Features

- Create a task
- Read a task
- Update a task
- Delete a task
- Mark a task as complete
- Mark a task as incomplete
- Assign a task  to users
- Assign a task to a project

## Installation

- Clone the repository using the command below

```bash
git clone https://github.com/CaMiMtoto/Task-Management-React-Js.git
```

- Install dependencies

```bash
npm install
```

- Adjust API URL in the `src/configs/httpConfig.js` file

```javascript
const http = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    },
});
```

- Run the app

```bash
npm run dev
```

Go to `http://localhost:3000` to view the app, or the port specified in the terminal.

Go find the API
code [https://github.com/CaMiMtoto/Task-manager-node-api](https://github.com/CaMiMtoto/Task-manager-node-api)

# Task-Management-React-Js
