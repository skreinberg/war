# War

This repository includes a full-stack application that plays War. The backend API handles all of the logic necessary for the game. The frontend app allows users to view each simulated game hand-by-hand as well as add/view users.

#### Technologies Used

- Vanilla NodeJS server with Express
- Postgres managed by TypeORM
- create-react-app frontend with TailwindCSS
- Prettier for code formatting

#### Considerations

It was a tough decision whether or not to go with certain NPM packages. For example, TypeORM and create-react-app are probably overkill for the scope of this project. However, I wanted to show that I am familiar with common production-ready packages that are commonly incorporated in larger projects.

I purposely included the .env file in `/frontend`. I understand this might be a point of contention -- since frontend variables are baked into the code during build, I decided it would be best to leave the file in for clarity. Saving the backend variables would not be safe and that is why I included `/backend/.env.example`.

#### Running App Locally

I utilized a monorepo setup coordinated by Yarn workspaces in an attempt to make the setup process as easy as possible. I have tested the app on Node versions 12-14 successfully.

Steps to run app:

1. Review `/backend/.env.example` and create `/backend/.env` file with proper database connection variables, I am happy to share GCP Database credentials if necessary. `PORT` should remain `3001` for frontend to connect
2. Run `yarn` in root directory
3. Run `yarn dev` in root directory

Please let me know if you have any problems.

#### Backend Routes

- User Controller
  - GET /
    - Retrieves all users with respective records
  - POST /
    - Create user with required `name` value
  - GET /user
    - Retrieve user by `name`
- Game Controller
  - GET /
    - Retrieves specific game by `id`
  - GET /deal
    - Retrieve shuffled deck broken into two hands of 26 cards
  - POST /play
    - Play game with required `player1`, `deck1`, `player2`, `deck2`

#### Frontend Views

- `/` Home
  - Allows users to see the sbuffled hands and tell the server to play the game
  - Allows users to input new player names that will be saved to the database
- `/game/:id` Game
  - Allows users to view the results of the game
  - Allows users to "Run Simulation" and go through the game hand-by-hand
- `/user` User
  - Allows users to view all users and respective all-time records

#### Cloud Infrastructure

I hosted the application on Google Cloud Platform. The containerized app is running on Google's Cloud Run (similar to ECS but far easier to use effectively in my opinion) referencing a Docker image stored on Google's Container Registry (extremely similar to ECR). The Postgres database tied to the application is provisioned through Google's Cloud SQL.

With a little more time, I would have created terraform scripts in order to easily create the above architecture. If this is something you are interested in seeing, I would be happy to create these scripts.

Docker file can be built by running `docker build . -t app` from the root directory.

Hosted URL: [https://site-op2heymbrq-uc.a.run.app/](https://site-op2heymbrq-uc.a.run.app/)

#### Nice to Add

- Add migrations -- it is hard to run tests in Github Actions without these
- Add more tests. There are a decent number of tests but this can be improved. Testing can be done by running `yarn run test` from the root directory
