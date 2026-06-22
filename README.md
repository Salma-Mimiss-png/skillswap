#Vous trouverez le code source dans la branche Master 
# SkillSwap 🔄
> Échangez vos compétences, développez-vous ensemble.

SkillSwap est une application mobile communautaire qui permet aux utilisateurs d'échanger leurs compétences sans argent — vous enseignez ce que vous savez, vous apprenez ce dont vous avez besoin.

---

## ✨ Fonctionnalités

- **Profil de compétences** — Listez ce que vous offrez et ce que vous cherchez à apprendre
- **Recherche de compétences** — Trouvez des membres dont les compétences correspondent à vos besoins
- **Gestion des sessions** — Planifiez et gérez vos rendez-vous d'apprentissage
- **Système d'évaluation** — Notez vos sessions pour renforcer la confiance de la communauté
- **Administration** — Modération des compétences et gestion des utilisateurs et sessions

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 18.x
- npm ou yarn
- Java >= 17
- MongoDB 
- React Native CLI

### Installation — Back-end (Spring Boot)

```bash
# Cloner le dépôt
git clone https://github.com/Salma-Mimiss-png/skillswap.git
cd skillswap

# Configurer la connexion MongoDB dans src/main/resources/application.properties
# spring.data.mongodb.uri=mongodb://localhost:27017/skillswap

# Lancer l'application Spring Boot
./mvnw spring-boot:run
```

Le serveur sera disponible sur `http://localhost:8085`.

### Installation — Application mobile (React Native)

```bash
cd mobile

# Installer les dépendances
npm install

# Android
npx react-native run-android
```

---

## 🗂️ Structure du projet

```
skillswap/
├── src/                                        # Back-end Spring Boot
│   └── main/java/com/skillswap/backend/
│       ├── users/                              # Feature : utilisateurs
│       │   ├── User.java
│       │   ├── UserController.java
│       │   ├── UserService.java
│       │   └── UserRepository.java
│       ├── skills/                             # Feature : compétences
│       │   ├── Skill.java
│       │   ├── SkillController.java
│       │   ├── SkillService.java
│       │   └── SkillRepository.java
│       ├── sessions/                           # Feature : sessions d'échange
│       └── admin/                              # Feature : administration
├── mobile/                                     # Application mobile React Native
│   └── src/
│       ├── screens/                            # Écrans
│       │   ├── HomeScreen.tsx
│       │   ├── SearchScreen.tsx
│       │   ├── SkillDetailScreen.tsx
│       │   ├── skillUsersScreen.tsx
│       │   ├── Connexion.tsx
│       │   ├── Inscription.tsx
│       │   ├── Profil.tsx
│       │   └── EditProfile.tsx
│       ├── services/                           # Appels API
│       │   └── skillService.ts
│       ├── components/                         # Composants réutilisables
│       │   ├── InputWithIcon.tsx
│       │   ├── AuthProvider.tsx
│       │   ├── Menu.tsx
│       │   └── SideMenu.tsx
│       └── navigation/                         # Navigation
│           └── AppNavigator.tsx
└── pom.xml
```

---

## 🛠️ Stack technique

| Couche | Technologie |
|--------|-------------|
| Application mobile | React Native (TypeScript) |
| Back-end | Spring Boot (Java 17) |
| Base de données | MongoDB |
| Navigation mobile | React Navigation |
| API | REST / JSON |
| Build back-end | Maven |
