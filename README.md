# TASK MANAGEMENT APP

## Description

This is a task management app that allows users to create, read, update and delete tasks. The app is built using the
Django framework and the Django Rest Framework. The app is deployed on Heroku and can be accessed via the link below.

## Features

- Create a task
- Read a task
- Update a task
- Delete a task
- Mark a task as complete
- Mark a task as incomplete
- Assign a task to a user

## Installation

- Clone the repository using the command below

```bash
git clone https://github.com/CaMiMtoto/task-manager-react-js.git
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
