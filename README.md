
# Task Manager (Backend)

A Task Manager make it easy for users to create, assign and track tasks to improve team productivity.

## Installation

- Clone this repository

```bash
  git clone https://github.com/ujjwalnv/task-manager-BE.git
```

- Go to task-manager-BE repository and install dependencies

```bash
  cd task-manager-BE
  npm install
```

- Rename sampleEnv to .env
- Add username, password and Database name in the required place for PostgreSQL Database
- Run the backend

```bash
  npm run dev
```

## API Reference

#### Create a user

```
  POST /user
```

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. User's Name |
| `email` | `string` | **Required, Unique**. User's Email |

#### Create a task

```
  POST /tasks
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. User's id who is a creating a task |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Task's title|
| `description`      | `string` | **Required**. Task's description|
| `dueDate`      | `string` | **Required**. Due date task in "2024-02-09T12:00:00Z" format|
| `assignees`      | `Int[]` | **Required**. Assignee's ids|


#### Get tasks assigned to a user

```
  GET /tasks/assigned
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. User's id who is a assignee |

#### Get tasks created by a user

```
  GET /tasks/created
```
| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. User's id who is a creator |

#### Get filtered tasks based on due date, creator & assignees

```
  GET /tasks/filter
```
| Params | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dueDate`      | `Date` | Due date of task. (format: 2024-02-07T12:00:00.000Z)|
| `creatorId`      | `Int` | Creator's id |
| `assigneeId`      | `Int` | Assignee's id |