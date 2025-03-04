# article-management

### Author: Abhijit Baldawa

### Description

A fullstack app with authentication to manage articles.

### User interface

Below video demonstrates how the UI looks like and its functionality.

<https://github.com/user-attachments/assets/4822c46f-ea59-46d5-9397-8550737bab8a>

### Tech Stack

1. React.js/react-router
2. Node.js
3. Typescript
4. TailwindCSS
5. SQLLite

### Pre-requisites

Node.js (23.x) and yarn

### How to run the application

1. `cd apps/api`
2. execute `yarn` (installs dependencies)
3. execute `yarn start:dev` (this starts the server on `http://localhost:3001`)
4. `cd apps/client`
5. execute `yarn` (installs dependencies)
6. execute `yarn dev` (this starts the frontend server on `http://localhost:5173`)
7. Go to `http://localhost:5173` to see the UI
8. Login with the slug of any analyst (ex: `stuart-culverhouse`) and give any password (ex: `123`). This should login the user. Clicking on the user avatar logs out the user.

### Missing implementation

1. Movie shared TS interfaces/zod validations between frontend and backend into a common monorepo folder so that there is single source of truth and most code can be shared.

2. More component composition on the frontend so that we create separate components for `Select`, `Input` etc. instead of creating them directly in containers and not being able to reuse them if needed.

3. Use proper global state management solution on the frontend (ex. `zustand`) instead of context.

4. Error handling popups on the frontend.

5. Use proper REST api query library (ex. `react-query`) instead of `useCallApi`, which is fine for small application like this but it is a good practice to use established libraries which solves similar problems and provide many capabilities on top for more robustness.