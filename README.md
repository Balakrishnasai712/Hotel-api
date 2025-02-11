# Hotel API (Node.js + MongoDB)

This project is a RESTful API for managing hotel staff and menu items. Built using **Node.js**, **Express.js**, and **MongoDB** (with **Mongoose**), it allows you to perform CRUD operations on hotel employees and menu data.

---

## Features

- **Employee Management**: Add, view, update, and delete hotel staff (e.g., chefs, managers, waiters).
- **Menu Management**: Add, view, and filter menu items based on taste (e.g., spicy, sweet, sour).
- **Parameterized Endpoints**: Retrieve employees based on roles and menu items based on taste.
- **MongoDB Integration**: Uses Mongoose for seamless MongoDB interactions.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **dotenv** for environment variable management
- **Body-parser** for handling JSON requests

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/hotel-api-nodejs.git
cd hotel-api-nodejs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your MongoDB connection string:

```env
MONGO_URL=your_mongodb_connection_string
PORT=3000  # Optional: Defaults to 3000 if not specified
```

### 4. Run the Server

```bash
node server.js
```

The server will start on `http://localhost:3000`.

---

## API Endpoints

### **Base URL:** `http://localhost:3000`

### **Person (Employee) Routes**

| Method | Endpoint             | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | `/person`            | Retrieve all employees                   |
| GET    | `/person/:work`      | Retrieve employees by role (`chef`, `manager`, `waiter`) |
| POST   | `/person`            | Add a new employee                       |
| PUT    | `/person/:id`        | Update an existing employee by ID        |
| DELETE | `/person/:id`        | Delete an employee by ID                 |

**Example:**
```bash
GET /person/chef  # Returns all chefs
```

### **Menu Routes**

| Method | Endpoint           | Description                              |
|--------|--------------------|------------------------------------------|
| GET    | `/menu`            | Retrieve all menu items                  |
| GET    | `/menu/:taste`     | Retrieve menu items by taste (`spicy`, `sweet`, `sour`) |
| POST   | `/menu`            | Add a new menu item                      |

**Example:**
```bash
GET /menu/spicy  # Returns all spicy menu items
```

---

## Folder Structure

```html
.
├── server.js          <!-- Main server file -->
├── db.js              <!-- MongoDB connection setup -->
├── routes
│   ├── personRoutes.js  <!-- Employee routes -->
│   └── menuRoutes.js    <!-- Menu routes -->
├── models
│   ├── person.js      <!-- Employee schema -->
│   └── menu.js        <!-- Menu schema -->
├── .env               <!-- Environment variables (ignored in git) -->
└── .gitignore         <!-- Ignored files (node_modules, .env, etc.) -->
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- **Express.js** for building robust APIs
- **MongoDB** and **Mongoose** for database management
- **dotenv** for secure environment variable handling

---

Feel free to contribute or suggest improvements! 🚀

