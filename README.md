# LocalChefBazaar

## Project Overview
**LocalChefBazaar** is a modern online marketplace that connects home cooks with people looking for fresh, homemade meals. It allows customers to explore daily menus, place orders, make secure payments, and track their orders in real-time. For home cooks, it provides a simple platform to earn money from their kitchen without needing a physical restaurant.

The platform is built using the **MERN stack**:
- **MongoDB** for database
- **Express.js** for backend server
- **React.js** for frontend
- **Node.js** for server runtime

---

## Live Project
**Client Live URL:** https://localchefbazar-client.vercel.app/  

---

## Admin Credentials
- **Email:** Admin@gmail.com  
- **Password:** [123@asd]  

---

## Key Features

### User Roles & Permissions
- **Admin:** Full access including managing users, chefs, orders, and platform statistics.
- **Chef:** Can create meals, manage menus, and handle customer orders.
- **Customer/User:** Can browse meals, place orders, submit reviews, and add meals to favorites.

### Authentication
- Firebase authentication for user registration and login
- Default role: `user`
- Profile image upload
- Email, Name, Address, Password fields

### Pages & Functionalities
- **Home Page:** Animated hero, daily meals, customer reviews, and extra section
- **Meals Page:** List of daily meals with sorting by price
- **Meal Details Page:** Detailed view with reviews and favorite functionality (private)
- **Order Page:** Confirm order with automatic price calculation and status management
- **Dashboard:** Role-based dashboards
  - User: Profile, Orders, Reviews, Favorite Meals
  - Chef: Profile, Create Meal, My Meals, Order Requests
  - Admin: Profile, Manage Users, Manage Requests, Platform Statistics
- **Profile Page:** User information with "Be a Chef/Admin" request
- **Favorite Meals:** Table view with delete functionality
- **My Reviews:** List of reviews with update and delete options
- **Create Meal:** Chef can add new meals
- **My Meals:** Chef can manage their meals
- **Order Requests:** Chef can accept, deliver, or cancel orders
- **Manage Users & Requests:** Admin management with fraud detection
- **Platform Statistics:** Visual charts for payments, users, and orders

### Additional Features
- JWT-based authentication for secure access
- React Hook Form for all forms
- Dynamic title for each route
- Pagination on meals page (10 items per page)
- Responsive design for mobile devices
- SweetAlert/toast messages for actions
- Optional: Axios interceptors, search functionality, animations, dark/light theme toggle

---

## Installation & Setup

### Backend
1. Clone the server repository:
   ```bash
   git clone [https://github.com/Tasnim813/LocalchefBazar-server]
   cd server
Install dependencies:

bash
Copy code
npm install
Create .env file and add:

ini
Copy code
MONGO_URI=your_mongodb_connection_string
FIREBASE_CONFIG=your_firebase_config
JWT_SECRET=your_jwt_secret
Start server:

bash
Copy code
npm run dev
Frontend
Clone the client repository:

bash
Copy code
git clone [https://github.com/Tasnim813/LocalCheafBazar-client]
cd client
Install dependencies:

bash
Copy code
npm install
Create .env file and add:

ini
Copy code
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_SERVER_URL=http://localhost:5000
Start client:

bash
Copy code
npm start
