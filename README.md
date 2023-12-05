# SENG 513 Project

## Table of Contents
- [Contributors](#contributors)
- [Application Setup Guide](#application-setup-guide)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Starting the Application with Docker Compose](#starting-the-application-with-docker-compose)
  - [Setting up the Client](#setting-up-the-client)
  - [Setting up the Backend](#setting-up-the-backend)
  - [Running the Application](#running-the-application)
    - [Client](#client)
    - [Backend](#backend)
  - [Interacting with the Application](#interacting-with-the-application)

## Contributors
- Shourav Rakshit Ivan (UCID: 30131085)
- Cindy Rose Sy (UCID: 30118468)
- Francisco Huayhualla (UCID: 30091238)
- Paul Hui (UCID: 30122682)
- Kevin Phan (UCID: 30053689)

## Application Setup Guide

This guide will walk you through the steps needed to set up and run the application. The application consists of two main parts: the client and the backend.

## Prerequisites

Before you begin, ensure you have the following installed:
- Git
- Node.js
- Docker

## Cloning the Repository

1. Open a terminal and clone the repository using Git:

```
git clone git@github.com:the-sin14/seng-513-project.git
```

2. Navigate to the cloned repository:

```
cd [Your_Repository_Name]
```

## Starting the Application with Docker Compose

To run the application, we use Docker Compose to manage the client and backend services together. Follow these steps to start the application using Docker Compose:

1. Make sure you are in the root directory of the cloned repository in your terminal.

2. Create a `.env` file in the root directory of the project if it doesn't already exist. You can use the provided `.env.example` file as a template and customize it as needed.

3. Start the application using Docker Compose by running the following command:

```bash
docker-compose up -d
```

4. Use this command to monitor logs
```
docker-compose logs -f
```

5. Open a browser and navigate to 
```
http://localhost:5173
```

6. Take down the application 
```
docker-compose down
```


## If you do not have docker installed follow the below process.
## you might have issues if you are not on windows OS

## Setting up the Client

1. Open a new terminal for setting up the client.
2. Navigate to the client directory:
```
cd client
```
3. Install the necessary dependencies:
```
npm install
```
There is a chance this doesn't work out, if that is the case, use:
```
npm install --force
```
## Setting up the Backend

1. Open another new terminal for setting up the backend.
2. Navigate to the backend directory:

```
cd backend
```
3. Install the necessary dependencies:
```
npm install
```


## Running the Application

### Client

1. In the client terminal, start the client application:
```
npm run dev
```
2. The client will be available at `http://localhost:5173`.

### Backend

1. In the backend terminal, start the backend server:
```
npm run dev
```
2. The backend server will be running on port 5000

## Interacting with the Application

Once both the client and backend are running, you can interact with the system using the client interface at `http://localhost:5173`.
