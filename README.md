# NBA Stats 3

Monorepo z:

- frontendem Next.js w katalogu `frontend/`
- backendem NestJS w katalogu `backend/`

## Struktura

```text
.
├─ frontend/   # aplikacja Next.js
├─ backend/    # API NestJS
└─ docker-compose.yml
```

## Wymagania

- Node.js 22+
- npm
- (opcjonalnie) Docker + Docker Compose

## Uruchamianie lokalne (bez Dockera)

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Backend działa domyślnie na: `http://localhost:4000`

### 2) Frontend

W osobnym terminalu:

```bash
cd frontend
npm install
npm run dev
```

Frontend działa domyślnie na: `http://localhost:3000`

## Uruchamianie przez Docker Compose

Z katalogu głównego projektu:

```bash
docker compose up -d --build
```

Serwisy:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`

Zatrzymanie:

```bash
docker compose down
```

## Build produkcyjny

### Frontend

```bash
cd frontend
npm run build
npm run start
```

### Backend

```bash
cd backend
npm run build
npm run start
```

