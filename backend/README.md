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

## Build produkcyjny

Z katalogu `backend`:

```bash
npm install
npm run build
npm run start
```

Tryb produkcyjny uruchamia skompilowany plik `dist/main.js`.

## Uruchamianie przez Docker Compose (z root projektu)

```bash
docker compose up -d --build
```

Serwisy:

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`

Dockerfile backendu korzysta z buildu wieloetapowego:

- etap `builder`: `npm ci` + `npm run build`
- etap runtime: tylko `node_modules` (bez devDependencies) i `dist`

## CI/CD backendu (Azure App Service)

Workflow backendu jest w:

- `.github/workflows/backend-app-service.yml`

Uruchamia się na push do `master` tylko przy zmianach w `backend/**`.

Wymagane ustawienia w GitHub:

- secret: `AZURE_WEBAPP_PUBLISH_PROFILE_BACKEND`
- variable: `AZURE_BACKEND_WEBAPP_NAME` (wymagane; dokładna nazwa App Service, np. `nba-info-gkebftgnhhcthxe7`)

Wymagane ustawienia App Service:

- Startup Command: `node dist/main.js`
- App Setting `ALLOWED_ORIGINS` z domeną frontendu (np. `https://twoja-aplikacja.azurestaticapps.net`)

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
