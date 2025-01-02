# Appsforce - Users Library App

This is a **Users Library** application built using **React**, **TypeScript**, and **Next.js**. The app fetches user data from the [Random User API](https://randomuser.me/api/?results=10) and provides functionalities to view, edit, and manage users.

### Features:

- **Display Users**: The app fetches and displays a list of 10 users with details like name, email, location, and profile image.
- **Edit Users**: Users can be edited locally. Fields that can be edited include:
  - **Name** (First and Last)
  - **Email**
  - **Location** (City and Country)
- **Add New User**: A button is provided to add new users through a form.
- **Delete User**: Users can be deleted with a confirmation message.
- **Validation**: Each input field is validated before saving:
  - All fields are required.
  - Name should be at least 3 characters long.
  - Email should be a valid email address and unique.
- **Responsive Design**: The app is responsive and optimized for both desktop and mobile devices.

### Technologies Used:

- **React** (with TypeScript)
- **Next.js**
- **Styled Components / SCSS Modules**
- **React Query** (for data fetching and state management)
- **Modal for Editing**: Used to edit user data with Save/Cancel options.

---

## How to Install and Run:

1. **Clone the repository**:
   First, clone this repository to your local machine using the following command:

   ```bash
   git clone <repository-url>

   ```

2. Navigate to the project directory: Once the repository is cloned, navigate into the project directory:
   cd <project-directory>

3. Install dependencies: Run the following command to install the required dependencies:
   npm install

4. Run the development server: Once the dependencies are installed, you can start the development server with:
   npm run dev

5. Open the app in your browser: After the server starts, open your browser and go to:
   http://localhost:3000
