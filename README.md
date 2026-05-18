The Global Kitchen API
A RESTful API for managing a digital cookbook of global recipes. Built with Node.js and MongoDB following a clean 3-tier layered architecture that separates routes, controllers, services and models.
---
Tech Stack
Runtime: Node.js v22
Framework: Express.js
Database: MongoDB Atlas
ODM: Mongoose
Configuration: dotenv
---
Features
Create, read, update and delete recipes
Filter all recipes by category using a query parameter
Schema-level validation using required, enum, min and trim rules
BSON-aware data types — cookingTime stored as a real Number, timestamps as real Date objects
Database indexing on the category and title fields for faster lookups
Single reusable MongoDB connection module following the DRY principle
All database operations handled asynchronously using async/await
Global error handling middleware that returns proper HTTP status codes
Every controller path ends with a response so the client never hangs
---
Project Structure
    kitchenledger/
    ├── src/
    │   ├── config/
    │   │   └── db.js                  <- Single MongoDB connection module
    │   ├── models/
    │   │   └── recipe.model.js        <- BSON schema with validation and indexing
    │   ├── services/
    │   │   └── recipe.service.js      <- All business logic lives here
    │   ├── controllers/
    │   │   └── recipe.controller.js   <- Handles request and response cycle
    │   ├── routes/
    │   │   └── recipe.routes.js       <- API endpoint definitions
    │   └── app.js                     <- Express app setup and middleware
    ├── server.js                      <- Entry point, starts server after DB connects
    ├── .env                           <- Environment variables (never pushed to GitHub)
    ├── .gitignore                     <- Excludes node_modules and .env
    └── package.json                   <- Project dependencies and scripts

---
Installation & Setup
1. Clone the repository
    git clone https://github.com/nkengfuacaleb237/kitchenledger.git

2. Install dependencies
    cd kitchenledger
    npm install

3. Create a .env file in the root directory and add the following
    PORT=3000
    MONGODB_URI=your_mongodb_atlas_connection_string

The .env file is listed in .gitignore and will never be pushed to GitHub.
Exposing your MongoDB URI in a public repository is a serious security risk.
4. Start the server
    npm run dev

When everything is working you will see this in your terminal:
    MongoDB Connected: your-cluster.mongodb.net
    Server is running on port 3000

---
API Endpoints

Base URL during development: http://localhost:3000

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/recipes` | Retrieve all recipes |
| GET | `/recipes/:id` | Retrieve a single recipe by ID |
| POST | `/recipes` | Create a new recipe |
| PATCH | `/recipes/:id` | Update specific fields of a recipe |
| DELETE | `/recipes/:id` | Delete a recipe from the collection |

Filter by Category

To retrieve only recipes from a specific category, add a query parameter like this:
    GET /recipes?category=Dessert
    GET /recipes?category=Main Course

---
Recipe Schema

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | String | Yes | Trimmed, cannot be empty |
| ingredients | Array of Strings | Yes | must not be empty |
| instructions | String | Yes | Trimmed, cannot be empty |
| cookingTime | Number | Yes | must be greater than 0 |
| difficulty | String | Yes | only accepts: Easy, Medium, Hard |
| category | String | Yes | Trimmed, cannot be empty |
| createdAt | Date | Auto | Set automatically on creation |
| updatedAt | Date | Auto | updated automatically on every save |

---
Sample Request Body

When creating or updating a recipe send JSON in this format:
    {
      "title": "Ndole",
      "ingredients": [
        "500g bitter leaves",
        "300g groundnuts",
        "200g shrimps",
        "palm oil",
        "crayfish",
        "2 onions"
      ],
      "instructions": "Boil and squeeze the bitter leaves to remove bitterness. Blend groundnuts and fry with palm oil, add shrimps, crayfish and seasoning, then mix in the leaves and simmer for 20 minutes.",
      "cookingTime": 90,
      "difficulty": "Hard",
      "category": "Main Course"
    }

---
Error Responses
All errors across the entire application are caught by a single global error handling middleware and returned as structured JSON so the client always gets a clear response.
    {
      "status": "fail",
      "message": "No recipe found with that ID"
    }

| Status Code | Meaning |
|-------------|---------|
| 200 | Request was successful |
| 201 | Recipe was created |
| 400 | Invalid input or bad ID format |
| 404 | Recipe not found |
| 500 | Internal server error |
