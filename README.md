# Simple Todo App with React (MERN full Stack App with Authentication/Authentication)

This app is a very simple todo app with React.js.
The Context API and useReducer are used for state management, and the data is stored in the MongoDB. In addition, the Authentication / Authorization functionality is added

- The original version (app-level state management) can be found in [Simple Todo App with React hooks](https://github.com/kjx63pro/simple_todo_app_with_react_hooks)

- The second version (state managed with context API without Backend) can be found in [Simple Todo App with React (Built with Context API and React Hooks)](https://github.com/kjx63pro/simple_todo_app_with_react_context_api_and_react_hooks)

- The third version (Full Stack MERN) can be found in [Simple Todo App with React (MERN full Stack App)](https://github.com/kjx63pro/simple_todo_app_MERN)

## Quick Start

```
1. Install all npm pachages used in this app

- In the root folder
$ npm install

- Also in the client folder
$ npm run clientinstall

2. Connect to MongoDB
  - Create a file "default.json" in the config file
  - In the default.json file, paste your connection string from mongoDB atlas in <Your conneciton string>
  {
  "mongoURI": "<Your connection string>"
}

3. Run frontend & backend server
$ npm run dev

```

## Some of the screen shots of this app

## Technologies Used

- Frontend

  - React.js
    - Context API and useReducer for State management
  - Material UI
  - React Bootstrap
    - Navbar
  - Authentication
  - Authorization

- Backend ⭐️
  - Express
    - Authentication
  - MongoDB

## Functions

- Add Todo
- Delete Todo
- Complete Todo (Line-through)
- Navigation to Browse different routes (Navbar with React Bootstrap)
- Store Todo Data to the MongoDB
- ⭐️ Authentication (Login/Register Function)
- Authorization(Protected Routess)

## Who this app is for

For anyone who has a basic knowledge of React and want to learn MERN Stack for the first time

## Newt Todo

- [ ] Express-Validator
