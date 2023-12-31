# Capstone Project: Coach-Space - Getting Started Guide

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This guide will help you get started with the Coach-Space project. Coach-Space is a web application that helps coaches manage their training programs and users track their exercises. It's built using Node.js, Express.js, Sequelize, MySQL, and React.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** You need Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

- **MySQL:** You need MySQL installed locally or have access to a MySQL server. You can download MySQL from [https://www.mysql.com/](https://www.mysql.com/).

## Installation

1. **Clone the repository:**

   git clone https://github.com/villegasjustine/capstone
   This should contain all the dependencies needed for the application. 
   Otherwise, dependencies are provided below.
    

2. **Navigate to the project directory:**

    cd capstone-app

3. **Install dependencies for the frontend:**

   cd frontend
   npm install axios dayjs react react-cookie react-dom react-router-dom vite 
  

4. **Install dependencies for the backend:**

   cd backend
   npm install bcryptjs cors dotenv jsonwebtoken mysql2 sequelize


## Configuration

Before running the application, you need to configure it:

1. **Database Configuration:**

   - Create a MySQL database for your project.


NODE_ENV = local

DB_NAME=capstone
DB_USER=root
DB_PASSWORD=2@!3V!ll
DB_HOST=localhost
DB_PORT=3307


2. **Environment Variables:**

   Create a `.env` file in the `backend` directory and set the following environment variables:

   ```env
   PORT=8080
   SECRET_KEY=your-secret-key
   ```

   Replace `CWJkeykey` with a strong, unique secret key for your application.

## Running the Application

To run the application, follow these steps:

1. **Start the backend server:**

   In the `backend` directory, run:
   npm start

   This will start the Express.js server.

2. **Start the frontend development server:**

   In the `frontend` directory, run:

   npm start

   This will start the React development server.

3. **Access the application:**

   Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the Capstone Project: Coach-Space application.

## Usage

Here are some basic usage instructions for the application:

- **User Registration and Login:**
  - Users can register for an account.
  - Existing users can log in using their credentials.

- **Coaches and Users:**
  - Coaches can assign exercises to users.
  - Users can view their assigned exercises.

- **Tracking Progress:**
  - Users can track their exercise progress through the leaderboard bar.

- **Customization:**
  - Coaches can create, edit, and delete exercises.



---
