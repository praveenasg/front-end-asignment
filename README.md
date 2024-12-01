# Front-End Assignment

A React-based project for contact management featuring a form with validation, a searchable contact table, and seamless integration with modern libraries.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Deployment Instructions](#deployment-instructions)
- [Configuration](#configuration)
- [Test Plan](#test-plan)
- [Sample Data](#sample-data)
- [Repository Link](#repository-link)

---

## Features

- **React Hook Form** for form management
- **Zod** for schema validation
- **TanStack Table** for data display
- **TailwindCSS** for styling
- **Date-fns** for date management

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16.x or later)
- **npm** or **yarn**
- A code editor, e.g., **VS Code**
- **Git**

---

## Deployment Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/praveenasg/front-end-asignment.git
   cd front-end-asignment
   ```

2. **Install Dependencies**
   Install the necessary packages using npm or yarn:

   ```bash
   npm install
   # OR
   yarn install
   ```

3. **Run the Development Server**
   Start the development server locally:

   ```bash
   npm run dev
   # OR
   yarn dev
   ```

   By default, the application will run on `http://localhost:3000`.

4. **Build for Production**
   To prepare the application for production deployment:

   ```bash
   npm run build
   # OR
   yarn build
   ```

5. **Start the Production Server**
   After building, run the production server:
   ```bash
   npm start
   # OR
   yarn start
   ```

---

## Configuration

This project uses:

- **TailwindCSS**: Update `tailwind.config.js` for custom styling.
- **Form Management**: Modify default values or validation schema in `ContactSearch`.

---

## Test Plan

### Test Environment

- **Node.js**: v16+
- **Browser**: Latest versions of Chrome/Firefox/Edge

### Test Cases

1. **Form Field Validation**

   - **Input**: Enter an invalid email.
   - **Expected Result**: Displays "Enter a valid email" error.
   - **Input**: Enter a phone number exceeding 10 digits.
   - **Expected Result**: Displays "Phone number should be 10 digits" error.

2. **Contact Search**

   - **Input**: Enter partial data, e.g., `firstname = "John"`.
   - **Expected Result**: Displays filtered data matching the input.
   - **Input**: Leave all fields blank.
   - **Expected Result**: Displays all available contacts.

3. **Row Selection**

   - **Action**: Click a row in the data table.
   - **Expected Result**: Populates the selected row's data into the form.

4. **Pagination**

   - **Action**: Navigate to the next page of the data table.
   - **Expected Result**: Displays the next set of data.

5. **Date Picker**
   - **Input**: Attempt to select a date before 1900 or after today.
   - **Expected Result**: Selection is disabled for out-of-range dates.

---

## Sample Data

Sample data is preloaded in `contactsData` and is located in the file `@/lib/sampleData`.

---
