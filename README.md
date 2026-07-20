# Kivu Art Confort

Kivu Art Confort est une application web moderne développée avec Next.js, Prisma et PostgreSQL, conçue pour digitaliser la présence d’une entreprise spécialisée dans la vente de produits, la mise en valeur de services, la gestion d’événements et le commerce en ligne.

## Présentation du projet

Cette solution a pour objectif de centraliser l’expérience utilisateur et l’administration métier dans une plateforme unique, fiable et évolutive. Elle couvre à la fois la partie publique du site et la partie d’administration, avec un focus sur la simplicité d’utilisation, la performance et la sécurité.

## Fonctionnalités principales

- Présentation institutionnelle et pages éditoriales
- Catalogue de produits et services
- Formulaires de contact et de demande de service
- Gestion des événements
- Espace d’administration sécurisé
- Authentification utilisateur avec NextAuth
- Panier et gestion des commandes
- Notifications internes et emails transactionnels
- Base de données relationnelle avec Prisma

## Stack technique

| Catégorie | Technologie |
| --- | --- |
| Framework | Next.js 14 |
| Interface | React 18 |
| Backend | Node.js |
| Base de données | PostgreSQL |
| ORM | Prisma |
| Authentification | NextAuth |
| Styles | Tailwind CSS |
| Emails | Nodemailer |

## Architecture du projet

```text
app/              # routes, pages et API Next.js
components/      # composants UI réutilisables
lib/              # logique métier, auth, mailer et accès base de données
prisma/           # schéma Prisma et migrations
doc/              # documentation complémentaire (si ajoutée)
public/           # assets statiques
scripts/          # scripts utilitaires
```

## Prérequis

Avant toute installation, assurez-vous d’avoir :

- Node.js 18 ou supérieur
- npm ou pnpm
- PostgreSQL installé et accessible
- Git

## Installation locale

1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd KIVU-ART-CONFORT
```

2. Installer les dépendances

```bash
npm install
```

3. Copier le fichier d’environnement

```bash
cp .env.example .env
```

4. Configurer les variables d’environnement dans le fichier `.env`

## Variables d’environnement

Le projet attend les variables suivantes :

```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Administration initiale
INITIAL_ADMIN_EMAIL="admin@example.com"

# Mail
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"
MAIL_FROM="no-reply@example.com"
```

> Les secrets ne doivent jamais être commités sur GitHub. Utilisez les secrets de votre hébergeur ou de GitHub Actions.

## Configuration de la base de données

Appliquer les migrations Prisma :

```bash
npx prisma migrate deploy
```

Générer le client Prisma :

```bash
npx prisma generate
```

Optionnellement, alimenter la base localement :

```bash
npx prisma db seed
```

## Démarrage en développement

```bash
npm run dev
```

Puis ouvrir :

```text
http://localhost:3000
```

## Build et mise en production

Construire l’application :

```bash
npm run build
```

Lancer en mode production :

```bash
npm run start
```

## Déploiement recommandé

### Vercel

1. Connecter le dépôt GitHub à Vercel
2. Ajouter les variables d’environnement dans l’interface Vercel
3. Déployer la branche principale

Variables à prévoir dans l’environnement de production :

- DATABASE_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- INITIAL_ADMIN_EMAIL
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- MAIL_FROM

### Autres plateformes

Sur Render, Railway, Azure, VPS ou tout autre hébergeur, assurez-vous que :

- la base PostgreSQL est accessible
- les variables d’environnement sont correctement renseignées
- le build exécute bien Prisma
- la commande de démarrage est adaptée à Next.js

Exemple de commande de démarrage :

```bash
npx prisma migrate deploy && npm run start
```

## Checklist de production

Avant la mise en ligne finale, vérifier :

- [ ] les variables d’environnement sont correctement configurées
- [ ] la base PostgreSQL est opérationnelle
- [ ] l’authentification OAuth fonctionne
- [ ] les emails de contact et notifications sont testés
- [ ] l’accès administrateur est sécurisé
- [ ] la branche principale est protégée sur GitHub
- [ ] les secrets ne sont pas présents dans le dépôt

## Bonnes pratiques GitHub

- Protéger la branche principale
- Utiliser des Pull Requests pour toutes les modifications
- Gérer les secrets avec les mécanismes proposés par l’hébergeur
- Ne jamais publier de fichiers `.env`
- Documenter chaque changement majeur

## Contribution

Les contributions sont les bienvenues. Pour proposer une amélioration :

1. créer une branche dédiée
2. effectuer les modifications
3. ouvrir une Pull Request avec une description claire

## Licence

Ce projet est destiné à un usage professionnel ou commercial selon les règles de son propriétaire et des partenaires concernés.
