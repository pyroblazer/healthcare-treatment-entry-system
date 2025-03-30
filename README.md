# Simple Healthcare Treatment Entry System

This project is a simple full-stack application designed to allow medical providers to input and store details of patient treatments and prescribed medications.

## Tech Stack

### Frontend
- **React.js**
- **Chakra UI** (UI framework)
- **Axios** for API calls

### Backend
- **NestJS** (Typescript)
- **Prisma ORM** with **PostgreSQL**
- **Custom AuthGuard** for route protection

---

## Features

- Form with the following fields:
  - Patient Name (String)
  - Patient ID (String or Number)
  - Date of Treatment (Date Picker)
  - Treatment Description (Multi-select Dropdown)
  - Medications Prescribed (Multi-select Dropdown)
  - Cost of Treatment (Decimal)
- Client-side validations
- Submits data to backend API
- Database interaction via Prisma ORM

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pyroblazer/healthcare-treatment-entry-system.git
cd healthcare-treatment-entry-system
```

---

### 2. Start the Backend

```bash
cd backend
npm install
cp .env.example .env # fill in the necessary env vars
npm run dev
```

---

### 3. Start the Frontend

```bash
cd ../frontend
npm install
cp .env.example .env # fill in the necessary env vars
npm run dev
```

App will be running on [http://localhost:5173](http://localhost:5173)

---

## API Endpoint

All endpoints are protected by `AuthGuard`.

### POST `/treatments`

Create a new treatment entry.

**Request Body:**

```json
{
  "patientName": "John Doe",
  "patientId": "P12345",
  "dateOfTreatment": "2025-04-25",
  "treatments": ["X-Ray", "Consultation"],
  "medications": ["Paracetamol", "Ibuprofen"],
  "treatmentCost": 250.00
}

```

**Response:**

```json
{
  "id": "uuid",
  "patientName": "John Doe",
  "patientId": "P12345",
  ...
}

```

----------

### GET `/treatments?page=1&limit=10`

Paginated list of treatments.

**Response:**

```json
{
  "treatments": [ ... ],
  "totalPages": 3,
  "currentPage": 1
}

```

----------

### GET `/treatments/:id`

Get a specific treatment by ID.

**Response:**

```json
{
  "id": "uuid",
  "patientName": "John Doe",
  "treatmentCost": 150.50,
  ...
}

```

----------

## Validation Rules

- All fields are required.
- Cost must be a positive number.
- Patient ID must be alphanumeric.
- At least one treatment and one medication must be selected.
