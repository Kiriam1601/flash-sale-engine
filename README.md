# ⚡ High-Performance Flash Sale Engine

A high-load Flash Sale processing system that ensures **Data Consistency** and effectively resolves **Race Conditions**.

## 🚀 Key Features
* **Concurrency Handling:** Solves the problem of hundreds of users purchasing the last item simultaneously using **Optimistic/Pessimistic Locking** (Atomic Update) techniques in PostgreSQL.
* **Security:** User authentication via **JWT (JSON Web Token)** and password encryption with **Bcrypt**.
* **RESTful API:** Standard API structure, easily scalable.
* **Containerization:** Encapsulates the entire environment (Node.js + PostgreSQL) using **Docker & Docker Compose**, deployable with a single command.
* **Frontend:** Real-time interface with continuous stock updates.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Connection Pooling)
* **DevOps:** Docker, Docker Compose
* **Tools:** Postman/REST Client (API Testing), JMeter/K6 (Load Testing)

## ⚙️ Installation & Setup

### Prerequisites
* Docker & Docker Compose must be installed.

### Main Steps to Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/flash-sale-engine.git
   cd flash-sale-engine

2. **Start the system:**
   ```bash
   docker-compose up --build


* Once running, access the Web interface at: `http://localhost:3000`

---

## 🔧 Common Management & Debug Commands

Below are useful commands to manage containers and check data during development.

### 1. Check System Status

View the list of running containers and their status:

```bash
docker-compose ps

```

### 2. View Application Logs (Debug)

Monitor backend real-time logs for debugging:

```bash
docker-compose logs -f app

```

*(Press `Ctrl + C` to exit)*

### 3. System Reset (Clean & Rebuild)

Use this when you want to wipe old data (Database), remove error images, and restart from scratch:

```bash
# Remove containers and volumes (DB data will be lost)
docker-compose down -v

# Rebuild and run in background (detached mode)
docker-compose up --build -d

```

### 4. Direct Database Access

Access the PostgreSQL container to run manual SQL commands:

```bash
docker exec -it flash-sale-db psql -U nam_admin -d flash_sale_db

```

**Useful SQL commands:**

* `\dt` : List all tables.
* `SELECT * FROM users;` : View user list.
* `SELECT * FROM flash_sales;` : View inventory/stock.
