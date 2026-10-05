# ---------- Étape 1 : compilation du site (Vite) ----------
FROM node:22-alpine AS build
WORKDIR /app

# Les dépendances d'abord : cette couche reste en cache tant que package*.json ne change pas
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# URL de l'API : celle de .env.production par défaut.
# Pour en utiliser une autre : docker build --build-arg VITE_SUBMIT_URL=https://… .
# (URL publique uniquement, elle est inscrite dans le JavaScript envoyé au navigateur.)
ARG VITE_SUBMIT_URL
RUN if [ -n "$VITE_SUBMIT_URL" ]; then export VITE_SUBMIT_URL; else unset VITE_SUBMIT_URL; fi; npm run build

# ---------- Étape 2 : image finale, nginx sert les fichiers statiques ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
