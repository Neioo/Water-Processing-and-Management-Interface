# BantayBayan: Water Processing and Management Interface

This repository contains the full-stack web application for managing records for a purified water refilling business. It provides an administrative interface for tracking water sales, managing product inventory, and visualizing business metrics through interactive dashboards.

## 🚀 Features

- **Dashboard & Analytics**: Real-time visualization of sales performance, order counts, and customer growth using Recharts.
- **Sales Management**: Comprehensive system to record, update, and delete sales transactions.
- **Product Inventory**: Tools to manage water products, including pricing and availability.
- **Data Export**: Support for exporting sales reports to CSV format for external analysis.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/) (via `mysql2`)
- **Communication**: [Axios](https://axios-http.com/)

## 📂 Project Structure

```
├── client/                 # Next.js frontend application
│   ├── src/app/            # Application routes and pages
│   └── src/app/components/ # Reusable UI components
├── backend/                # Express.js API server
│   └── index.js            # API endpoints and database logic
└── package.json            # Root configuration
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/neioo/water-processing-and-management-interface.git
cd water-processing-and-management-interface
```

### 2. Backend Setup

- Navigate to the backend folder: `cd backend`
- Install dependencies: `npm install`
- Configure your MySQL database credentials in `index.js`
- Start the server: `npm run dev` (uses nodemon)

### 3. Frontend Setup

- Navigate to the client folder: `cd ../client`
- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Open `http://localhost:3000` in your browser

## 📊 API Endpoints

- **GET** `/sales`: Retrieve all sales records
- **POST** `/sales`: Add a new sales entry
- **PUT** `/update/:id`: Update an existing sale
- **DELETE** `/delete/:id`: Remove a sales record
- **GET** `/products`: List all available products