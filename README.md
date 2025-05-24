# Project Management App

## Development Task: Simple Task Management and Collaboration Tool

The candidate will be tasked with deploying a Next.js application using the T3 stack and integrating it with a serverless backend on AWS using SST (Serverless Stack). Additionally, the use of Supabase as a database is required. This task will demonstrate the candidate's proficiency in our tech stack, their ability to integrate various technologies effectively, and their expertise in deploying and managing cloud infrastructure on AWS.

### Tech Stack Setup
Created using [create.t3.gg](https://create.t3.gg/) and [create-t3-app](https://github.com/t3-oss/create-t3-app) with the following options:

```
◇ What will your project be called?
│ ProjectManagementApp
│
◇ Will you be using TypeScript or JavaScript?
│ TypeScript
│
◇ Will you be using Tailwind CSS for styling?
│ Yes
│
◇ Would you like to use tRPC?
│ Yes
│
◇ What authentication provider would you like to use?
│ NextAuth.js
│
◇ What database ORM would you like to use?
│ Prisma
│
◇ EXPERIMENTAL Would you like to use Next.js App Router?
│ No
```

## Development Requirements

### 1. Task Management Interface
Develop an intuitive interface for task creation, assignment, and tracking. Features should include:
- Setting deadlines
- Assigning priorities/tags
- Assigning team members
- Adding detailed task descriptions

### 2. User Profile and Project Settings
Build a user profile section allowing team members to:
- Manage their personal information
- Manage their preferences

### 3. Deploy a Next.js Application
Set up a serverless backend for the application using [SST](https://sst.dev/). Requirements:
- Configure and deploy the backend on AWS
- Handle all functionalities required by the Next.js application
- Demonstrate cloud infrastructure management capabilities

### 4. Database Integration with Supabase
Integrate [Supabase](https://supabase.com/) as the database for the application:
- Design the database schema relevant to the application's requirements
- Implement Email and Password login
- Implement CRUD operations interacting with the Supabase database

### 5. Dashboard (Optional)
Create a central dashboard to provide a quick overview of:
- Ongoing projects
- Tasks
- Deadlines
- Team collaborations
- Components like task lists, project timelines, and relevant analytics or summaries

## Testing
Include a few unit tests, covering some functionalities that you deem relevant.

## Submission Requirements
- A GitHub repository link with the complete source code
- A comprehensive README detailing:
  - Project setup
  - Architecture
  - Testing
  - Deployment instructions
- You can take up to 1 week to complete this task
