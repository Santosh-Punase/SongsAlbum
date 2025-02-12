# Music Library App

This repository contains the **Music Library App**, a microfrontend-based application that allows users to browse, search, and add songs. The app supports user authentication with role-based access control, enabling only admins to add new songs.

## 🚀 Features

- **Authentication & Authorization**: Users can log in, and only admins can add songs.
- **Music Library**: Browse, search, and sort songs.
- **Microfrontend Architecture**: Integrates with a core app and a separate music library module.
- **State Management**: Uses React hooks for state handling.
- **Routing**: Handled by React Router.
- **Testing**: Unit tests with Jest and React Testing Library.

---

## 🛠️ Installation & Running the Project

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x.x)
- **npm** or **yarn**

### 1️⃣ Clone the Repository

```bash
 git clone https://github.com/Santosh-Punase/SongsAlbum.git
```

### 2️⃣ Setup the Music Library App
```bash
cd music-library
yarn install
yarn build && yarn preview
```


### 3️⃣ Setup Core App

```bash
cd music-home
yarn install
```

### 4️⃣ Setup Environment Variables

Create a `.env` file in the root and add the required configurations:

```env
LIBRARY_API_URL = http://localhost:5173;
```
### 5️⃣ Start the Development Server

```bash
yarn dev
```

The app will be available at `http://localhost:5174`.

---

## 🔑 Key Design Decisions & Trade-offs

### **Microfrontend Architecture**

- **Decision**: The core app and the music library are independent modules.
- **Trade-offs**: This approach allows better modularity and scalability but increases setup complexity.

### **State Management**

- **Decision**: Uses React hooks (`useState`, `useContext`) for lightweight state management.
- **Trade-offs**: Simple and performant for the current use case but might require Redux or Zustand for larger-scale applications.

### **Role-Based Access Control**

- **Decision**: User role is stored in `localStorage` and checked before allowing certain actions (e.g., adding songs).
- **Trade-offs**: Easy to implement but could be improved with server-side authentication and JWT-based authorization.

---

## 🧪 Running Tests & Viewing Coverage

### 1️⃣ Run Unit Tests

```bash
yarn test
```

### 2️⃣ View Test Coverage

```bash
yarn test:coverage
```

This generates a coverage report in the `coverage/` folder.

---

## 🏗️ Microfrontend Implementation

The **Music Library App** follows a **Microfrontend Architecture**, where the core app and the music library module operate as separate applications but seamlessly integrate through **Module Federation**.

### **How Microfrontends Work in This Project**
- The **Core App** (Host) loads the **Music Library** (Remote) dynamically using Webpack Module Federation.
- The **Music Library** exposes its components, allowing the core app to integrate them.
- Navigation and routing between the core app and the music library are handled using **React Router**.
- Environment variables are used to define the remote module URL, ensuring flexibility in deployments.

### **Benefits of Microfrontend Approach**
- **Scalability**: Each microfrontend can be developed and deployed independently.
- **Code Isolation**: Separate teams can work on different microfrontends without conflicts.
- **Reusability**: The music library can be used across multiple applications without modification.

---

## 🔐 Authentication & Authorization System

### **Authentication**
- Users log in using a simple authentication mechanism.
- On successful login, a token is generated and stored in `localStorage`.
- The app retrieves user details from `localStorage` to maintain the session.

### **Authorization & Role-Based Access Control**
- The `userRole` (either `user` or `admin`) is stored in `localStorage`.
- A **Higher-Order Component (HOC)** `withAuthorization` checks if the user has the necessary role to access specific pages.
- **Admin-Only Features**: The `Add Song` button is only visible to users with the `admin` role.
- If a non-admin tries to access the `/add-song` route, they are redirected to an **Unauthorized** page.

### **Security Considerations**
- Since the current implementation stores authentication details in `localStorage`, it is vulnerable to **XSS attacks**. A more secure approach would be to use **HTTP-only cookies** for session management.
- **JWT-based authentication** could enhance security and allow token expiration handling.
- **Server-side authorization** should be implemented to prevent unauthorized API access beyond just frontend role checks.

This implementation ensures a smooth user experience while keeping the system modular and scalable for future enhancements.

---
## 📜 License

This project is licensed under the **MIT License**.

