# Tasty restaurant.

A full-featured restaurant web application built using **Node.js**, **Express**, **EJS**, and **MySQL**.  
This project was developed as part of a Hcode course and demonstrates a modern backend with real-time capabilities using **Socket.IO**, session management with **Redis**, and file uploads.

## 🧠 Overview

**Restaurante Saboroso** is a dynamic restaurant platform where users can:

- Browse menu items
- Make reservations
- Interact in real-time updates
- Manage administrative tasks (via `/admin` routes)
- Upload images and interact with forms

The server is built with **Express.js** and uses **Redis** for session store, **Socket.IO** for real-time communication, and **EJS** for server-side HTML templates.

---

## 🧰 Technologies Used

This project includes the following tech stack:

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js |
| Templates | EJS (Embedded JavaScript) |
| Real-Time | Socket.IO |
| Session Store | Redis via `connect-redis` |
| Database | MySQL (via `mysql2`) |
| Logging | Morgan |
| File Uploads | Formidable |
| Body Parsing | body-parser |
| Error Handling | http-errors |
| Utilities | moment.js |

---

## 🚀 Features

✔️ **Dynamic restaurant pages**  
✔️ **Reservations with real-time updates (Socket.IO)**  
✔️ **Admin area for menu and content management**  
✔️ **Image upload support**  
✔️ **Session handling with Redis**  
✔️ **Responsive public views (EJS)**

---

## 📦 Installation

### 1. Clone this repository

```bash
git clone https://github.com/EDUDESTROER/Restaurante-saboroso-hcode.git
cd Restaurante-saboroso-hcode
