# Backend (NestJS)

Backend działa jako aplikacja NestJS i wystawia API używane przez frontend.

## Wymagania

- Node.js 22+
- npm

## Uruchamianie lokalne

Z katalogu `backend`:

```bash
npm install
npm run dev
```

Domyślny port: `4000`.

## Uruchamianie przez Docker Compose (z root projektu)

```bash
docker compose up -d --build
```

Serwisy:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`

## Główne endpointy

- `GET /health`
- `GET /api/bootstrap`
- `GET /api/roster/:teamId`
- `GET /api/teams`
- `GET /api/teams/:id`
- `GET /api/teams/state/:stateCode`
- `GET /api/standings`
- `GET /api/standings/state-champions`
- `GET /api/standings/:conference`
- `GET /api/states`

## Struktura NestJS

- `src/main.ts` – bootstrap Nest
- `src/app.module.ts` – root module
- `src/teams/*` – moduł i kontroler teams
- `src/standings/*` – moduł i kontroler standings
- `src/states/*` – moduł i kontroler states
- `src/bootstrap/*` – health + bootstrap + roster
