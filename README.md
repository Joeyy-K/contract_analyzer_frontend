# Contract Analyzer Frontend

A modern React application for analyzing and managing legal contracts built with Vite, React Router, and Tailwind CSS.


## Overview

Contract Analyzer is a web application that helps users manage, upload, and analyze legal documents. The system extracts key clauses and provides insights about the contracts, making it easier to understand complex legal documents.

## Features

- **User Authentication**: Secure login/registration system
- **Dashboard**: Overview of all uploaded contracts
- **Contract Upload**: Support for PDF and DOCX file formats
- **Contract Analysis**: Automatic extraction of key legal clauses:
  - Termination clauses
  - Confidentiality provisions
  - Payment terms
  - Governing law clauses
  - Limitation of liability sections
- **Responsive Design**: Works on desktop, tablet and mobile devices

## Tech Stack

- **React**: UI library
- **Vite**: Build tool and development server
- **React Router**: For application routing
- **Tailwind CSS**: For styling
- **Context API**: For state management
- **Axios**: For API communication

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Joeyy-K/contract_analyzer_frontend.git
   cd contract-analyzer-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/           # React Context for state management
├── pages/              # Page components
├── services/           # API services
├── utils/              # Utility functions
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## Backend API

This frontend application communicates with a backend API. The API endpoints include:

- `POST /auth/login`: User authentication
- `POST /auth/register`: User registration
- `GET /contracts`: Retrieve user contracts
- `POST /contracts`: Upload new contract
- `GET /contracts/:id`: Get contract details
- `POST /contracts/:id/analyze`: Analyze contract

## Building for Production

```
npm run build
```

The build output will be in the `dist` directory.


## License

This project is licensed under the MIT License - see the LICENSE file for details.
