# Document Management Dashboard

## Overview

AI Document Management Dashboard is a full-stack web application that allows users to upload, manage, track, and monitor PDF documents in real time.

The application supports single and bulk PDF uploads, document status tracking, email notifications, and document management through a modern dashboard interface.

---

## Features

### Document Upload

* Upload single PDF document
* Upload multiple PDF documents
* Real-time upload progress tracking
* File size and file type display
* Secure file storage

### Document Management

* View uploaded documents
* Download and open PDF documents
* Document status management
* Delete documents

### Status Tracking

* Under Verification
* Approved
* Rejected

### Notifications

* Email notification when a document is uploaded
* Email notification when document status changes
* Real-time status updates

### Dashboard

* Responsive UI
* Document listing
* Status tracking page
* Modern blue and white design

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* Multer
* Nodemailer

### Database

* MongoDB Atlas
* Mongoose

---

## Project Structure

backend/

* config/
* controllers/
* middleware/
* models/
* routes/
* uploads/
* utils/
* server.js

frontend/

* public/
* src/

  * config/
  * pages/
  * components/
  * App.jsx
  * main.jsx

---

## API Endpoints

### Upload Document

POST

/api/upload

### Get All Documents

GET

/api/upload

### Get Single Document

GET

/api/upload/:id

### Update Document Status

PUT

/api/upload/status/:id

### Delete Document

DELETE

/api/upload/:id

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a .env file inside backend folder.

Required Variables:

* PORT
* MONGO_URI
* EMAIL_USER
* EMAIL_PASS

---

## Author

Sakthivel V

Full Stack Web Developer Assessment Submission
