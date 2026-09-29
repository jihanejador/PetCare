🐾 PetCare — Plateforme de Gestion de Services et Rendez-vous pour Animaux

PetCare est une application web full-stack conçue pour mettre en relation les propriétaires d'animaux de compagnie avec des professionnels de la santé et du bien-être animal (vétérinaires, toiletteurs, éducateurs, pet sitters). La plateforme facilite la recherche de services, la prise de rendez-vous et la gestion des profils.

📸 Aperçu de l'Application

🛠️ Technologies & Architecture

Frontend

Framework: React.js (avec Vite)

Design/UI: Tailwind CSS

Routage: React Router DOM

Requêtes HTTP: Axios

Backend

Framework: Laravel (PHP)

Authentification: Laravel Sanctum (Tokens API)

Base de données: MySQL

Architecture: RESTful API & Pattern MVC

DevOps & Déploiement

Conteneurisation: Docker & Docker Compose

Serveur Web: Nginx (Conteneurisé)

Serveur Local: XAMPP (Apache / MySQL)

Registre: Docker Hub

📐 Conception & Analyse Système (UML & ERD)

1. Diagramme de Cas d'Utilisation (Use Case)

L'application répond aux besoins de trois utilisateurs principaux : ![alt text](<USE case File Rouge.png>)  ![alt text](<UML de File Rouge .png>)

Client (Propriétaire d'animal) : Création de compte, recherche de services, demande de réservation, suivi des statuts des rendez-vous.

Professionnel (Prestataire de services) : Gestion du profil professionnel, création/modification/suppression de services, acceptation ou refus des rendez-vous.

Administrateur : Modération et suivi global de la plateforme.

2. Diagramme de Classe & Diagramme Entité-Association (ERD)

Schéma des principales tables et relations dans MySQL : ![alt text](<Erd de File Rouge .png>)

users : Gestion des comptes (Rôles: Client / Professionnel).

services : Services proposés (user_id, title, category, price, description).

rendezvous : Réservations reliant un client (client_id) à un service (service_id) avec état (En attente, Accepté, Refusé).

categories : Catégorisation des prestations.

🐳 Images Docker & Déploiement

L'application est entièrement conteneurisée et disponible sur Docker Hub.

Dépôts Docker Hub

Image Frontend : https://hub.docker.com/r/jihandev/petcare-frontend

Image Backend : https://hub.docker.com/r/jihandev/petcare-app

Lancement rapide avec Docker Compose

# 1. Cloner le projet
git clone https://github.com/jihanejador/PetCare.git
cd PetCare

# 2. Lancer les conteneurs en arrière-plan
docker-compose up -d --build


Accès aux services :

Frontend : http://localhost:5173 (ou http://localhost:80 via Nginx)

Backend API : http://localhost:8000/api

💻 Configuration en Local (Environnement XAMPP)

Si vous exécutez le projet sur la branche main avec XAMPP :

Prérequis

PHP >= 8.1

Composer

Node.js & npm

XAMPP (Service MySQL démarré sur le port 3306)

1. Configuration du Backend (Laravel)

cd backend

# Installer les dépendances PHP
composer install

# Configurer l'environnement
cp .env.example .env


Vérifiez les paramètres suivants dans votre fichier backend/.env :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=petcare
DB_USERNAME=root
DB_PASSWORD=


Exécutez les migrations et alimentez la base de données :

php artisan migrate:fresh --seed
php artisan storage:link
php artisan config:clear
php artisan serve


2. Configuration du Frontend (React Vite)

cd ../frontend

# Installer les dépendances JS
npm install

# Démarrer le serveur de développement
npm run dev


📁 Structure du Projet

PetCare/
├── backend/                # API REST Laravel
│   ├── app/                # Contrôleurs, Modèles, Middlewares
│   ├── database/           # Migrations & Seeders
│   ├── routes/api.php      # Endpoints de l'API
│   └── Dockerfile          # Configuration Docker Backend
├── frontend/               # Application React + Vite
│   ├── src/                # Composants, Pages, Services Axios
│   └── Dockerfile          # Configuration Docker Frontend
├── docs/                   # Diagrammes et Captures d'écran
│   └── images/             # Emplacement des images README
├── docker-compose.yml      # Orchestration Multi-conteneurs
└── README.md               # Documentation du projet


🤝 Auteur

jihane jador 
