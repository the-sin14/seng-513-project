# SENG 513 Project

## Table of Contents
- [Introduction](#Introduction)
- [Contributors](#contributors)
- [Application Setup Guide](#application-setup-guide)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [With Docker](#with-docker)
    - [Starting the Application with Docker Compose](#starting-the-application-with-docker-compose)
  - [Without Docker](#without-docker)
    - [Setting up the Client](#setting-up-the-client)
    - [Setting up the Backend](#setting-up-the-backend)
    - [Running the Application](#running-the-application)
      - [Client](#client)
      - [Backend](#backend)
  - [Interacting with the Application](#interacting-with-the-application)

## Introduction
Introducing "Summarify" - Revolutionizing the Way You Study

In response to the challenges faced by students in managing complex academic material, we are proud to introduce "Summarify," a groundbreaking web-based application. Summarify not only simplifies the studying process but transforms it into an efficient and inclusive learning experience.

With Summarify, students can effortlessly upload lecture content and, in return, receive concise summaries, key insights, and interactive review questions with answers. Our platform is designed to cater to diverse learning preferences and paces, promoting inclusive learning for all.

Our primary objective is to enhance academic achievements while reducing the time spent on studying, ultimately fostering a more equitable educational experience. Say goodbye to traditional study methods; with Summarify, we are committed to ensuring that every student has the opportunity to master and retain essential knowledge required for their coursework. Welcome to a new era of effective and accessible learning with Summarify.

Checkout our demo:
```
https://www.youtube.com/
```

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
    - If you do not have docker, this application only works on Windows Operating Systems

## Cloning the Repository

1. Open a terminal and clone the repository using Git:

```
git clone git@github.com:the-sin14/seng-513-project.git
```

2. Navigate to the cloned repository:

```
cd [Your_Repository_Name]
```
## With Docker
## Starting the Application with Docker Compose

To run the application, we use Docker Compose to manage the client and backend services together. Follow these steps to start the application using Docker Compose:

1. Make sure you are in the root directory of the cloned repository in your terminal.
    - This can be evidenced by having the docker-compose.yml file in the same directory

2. Start the application using Docker Compose by running the following command:

```bash
docker-compose up -d
```

3. Use this command to monitor logs
```
docker-compose logs -f
```

4. Open a browser and navigate to 
```
http://localhost:5173
```

5. Take down the application 
```
docker-compose down
```

## Without Docker
This does not work on MacOS and was not tested in Linux OS. Docker is recommended.

## Setting up the Client

1. Open a new terminal for setting up the client.
2. Navigate to the client directory:
```
cd client
```
3. Install the necessary dependencies:
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
4. Install 2 more dependencies:
```
RUN npm i file-saver --force
```
```
RUN npm install @react-pdf/renderer --save --force
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

Once both the client and backend are running, you can interact with the system using the client interface at 
```
http://localhost:5173
```

