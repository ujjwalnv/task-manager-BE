
# Task Manager (Backend)

A Task Manager make it easy for users to create, assign and track tasks to improve team productivity.



## API Reference

#### Create a user

```http
  POST /user
```

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. User's Name |
| `email` | `string` | **Required, Unique**. User's Email |

#### Create a task

```http
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

```http
  GET /tasks/assigned
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. User's id who is a assignee |

#### Get tasks created by a user

```http
  GET /tasks/created
```
| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. User's id who is a creator |

#### Get filtered tasks based on due date, creator & assignees

```http
  GET /tasks/filter
```
| Params | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dueDate`      | `Date` | Due date of task. (format: 2024-02-07T12:00:00.000Z)|
| `creatorId`      | `Int` | Creator's id |
| `assigneeId`      | `Int` | Assignee's id |