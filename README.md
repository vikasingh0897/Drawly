<h1 align="center"> Drawly </h1>
<p align="center"> High-Performance Real-Time Multiplayer Drawing and Guessing Game Engine </p>

<p align="center">
  <img alt="Build" src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge">
  <img alt="Issues" src="https://img.shields.io/badge/Issues-0%20Open-blue?style=for-the-badge">
  <img alt="Contributions" src="https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge">
</p>

## 🌟 Overview

**Drawly** is a sophisticated, full-stack multiplayer entertainment platform designed to revolutionize how people experience collaborative online gaming. By merging the synchronization power of Socket.IO with a robust TypeScript-driven architecture, Drawly provides players with an automated, high-fidelity game engine. It doesn't just host a room; it orchestrates live canvas states, validates guesses in real-time, and transforms raw player interactions into a seamless competitive experience.

---

### The Problem

> Casual online gathering platforms and multiplayer party games often suffer from high setup friction—requiring bulky downloads, third-party client installations, mandatory account creations, or heavy processing overhead. Furthermore, real-time synchronization of canvas strokes and live guessing feeds over standard HTTP connections introduces distracting latency, breaking the fluid, split-second timing required for fast-paced social gaming.

---

### The Solution

---

#### Drawly eliminates the friction of traditional online party gaming through a coordinated full-stack architecture:

- **_Interactive Frontend:_** Provides a high-performance React-based interface where players can draw, guess, and compete on an interactive canvas with zero installation required.

- **_Robust Backend Orchestration:_** Built on Node.js and Express, the server manages the entire game workflow, ensuring seamless communication between all connected clients and the game engine.

- **_Real-Time Event Pipeline:_** Implements a modular socket handler architecture with dedicated pipelines for canvas events, chat validation, room lifecycle, and round management.

- **_WebSocket-Powered Intelligence:_** Leverages Socket.IO to synchronize drawing coordinates, guess validation, and score updates across all connected players with sub-millisecond latency.

- **_Actionable Visualization:_** Delivers a live Leaderboard Dashboard that transforms raw game events into immediate competitive standings and clear score insights.

- **_Room Lifecycle Management:_** Closes the loop by managing isolated private sessions, turn-based drawing rotations, and automated round transitions.

---

### Architecture Overview

---

Built on a **Component-based Architecture** (Frontend) && **WebSocket Event System** (Backend), ensuring modularity && scalability.

- **Frontend:** A Vite-powered React application focusing on high-performance canvas rendering and a seamless player journey.
- **Backend:** A TypeScript Express server emphasizing type-safe operations, real-time event dispatching, and in-memory state orchestration.

---

## ✨ Key Features

### 🎨 Interactive Synchronized Canvas

Transform mouse strokes into instantly shared visual data. The canvas engine broadcasts high-fidelity vector coordinates to every connected player the moment the drawer lifts a finger.

- **User Benefit:** Drawers enjoy fluid stroke feedback, and guessers view real-time representations without lag or visual stuttering.

### 💬 Real-Time Guessing & Chat

An in-game messaging panel that separates standard chat talk from correct guesses, powered by server-side string matching logic.

- **User Benefit:** Encourages interactive banter while automatically detecting and censoring correct words to preserve the game's challenge.

### 🛡️ Dedicated Room Lifecycle

Drawly is fortified with dynamic room allocation powered by local server-side state machines, including isolated session management and automated player roster tracking.

- **User Benefit:** Allows groups of friends to play in isolated sessions with custom word lists and dedicated player rosters.

### 🏆 Dynamic Live Leaderboards

Auto-calculating scoreboard component displaying player standings instantly, updated in real-time after every successful guess.

- **User Benefit:** Adds an exciting competitive element by visually highlighting point updates based on speed and guessing accuracy.

### 📖 Onboard 'How To Play' Guide

Integrated onboarding system captures new player attention via an informative modal detailing key mechanics and control layouts.

- **User Benefit:** Eliminates onboarding hurdles, enabling new players to grasp rules and interface configurations instantly.

### ⚡ Responsive Modern UI

Leveraging Tailwind CSS v4, the system generates pixel-perfect layouts across arbitrary viewing dimensions, providing context that rigid CSS frameworks miss.

- **User Benefit:** Ensure uniform, pixel-perfect visual fidelity across laptops, desktop monitors, and mobile displays.

---

## 🛠️ Tech Stack & Architecture

Drawly utilizes a modern, type-safe stack designed for reliability and developer productivity.

| Technology                | Purpose               | Why it was Chosen                                                                                               |
| :------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **TypeScript**            | Primary Language      | Provides robust type safety across the entire stack, reducing runtime errors in WebSocket message payloads.     |
| **React (v19.2.6)**       | Frontend Framework    | Enables a reactive, component-based UI for complex state management in the canvas and leaderboard.              |
| **Express**               | Backend Framework     | A lightweight, flexible Node.js framework ideal for building high-performance event-driven server applications. |
| **Socket.IO**             | Real-Time Transport   | Facilitates low-latency, TCP-based duplex communication channels between drawing clients and the game engine.   |
| **Tailwind CSS (v4.3.0)** | Utility-First Styling | Enables rapid prototyping of components and highly custom UI themes with compiled CSS footprints.               |
| **Vite (v8.0.12)**        | Build Tooling         | Delivers hot module replacement (HMR) and optimal compilation pipelines for rapid development feedback cycles.  |

---

## 📁 Project Structure

```
vikasingh0897-Drawly-190ebe0/
├── 📄 .gitignore                      # Global Git ignore profiles
├── 📁 backend/                        # Node.js + Express WebSocket backend application
│   ├── 📄 package.json                # Backend dependency and script manager
│   ├── 📄 package-lock.json           # Strict version lock for backend libraries
│   ├── 📄 tsconfig.json               # Backend TypeScript compiler options
│   └── 📁 src/                        # Backend source code
│       ├── 📄 app.ts                  # Express initialization and server configuration
│       ├── 📄 index.ts                # Application bootstrapper and socket listener
│       ├── 📁 store/                  # In-memory storage components
│       │   ├── 📄 words.ts            # Database of guessable words and terminology lists
│       │   └── 📄 room.ts             # Active room states, roster lists, and game round engines
│       └── 📁 socketHandlers/         # Dedicated event-handling pipelines
│           ├── 📄 canvasHandler.ts    # Synchronizes canvas drawing coordinates and brush styles
│           ├── 📄 chatHandler.ts      # Processes messages, filters spoilers, and awards guess points
│           ├── 📄 roomHandler.ts      # Manages room creation, join bounds, and user lifecycles
│           └── 📄 gameHandler.ts      # Controls active game loops, round configurations, && turn timers
└── 📁 frontend/                       # React Single-Page Web Application
    ├── 📄 vite.config.ts              # Vite compilation and proxy configurations
    ├── 📄 tsconfig.app.json           # App-specific TypeScript definitions
    ├── 📄 eslint.config.js            # Linter rules configuration
    ├── 📄 package.json                # Frontend dependency and script declarations
    ├── 📄 package-lock.json           # Lock file for frontend dependencies
    ├── 📄 tsconfig.json               # Parent TypeScript project configurations
    ├── 📄 tsconfig.node.json          # Node-focused compiler configurations for Vite config
    ├── 📄 index.html                  # Main HTML entry mount point
    ├── 📁 src/                        # Frontend source files
    │   ├── 📄 main.tsx                # Main application bootstrapper
    │   ├── 📄 App.tsx                 # Root component hosting routing configurations
    │   ├── 📄 socket.ts               # Centralized WebSocket instantiation client
    │   ├── 📄 index.css               # Global stylesheets and Tailwind CSS setup
    │   ├── 📁 pages/                  # Primary client-side view routers
    │   │   ├── 📄 GamePage.tsx        # Active game interface (Canvas, Chat, Leaderboard)
    │   │   └── 📄 LandingPage.tsx     # Entrance portal for creating or joining lobby sessions
    │   └── 📁 components/             # Reusable structural and visual elements
    │       ├── 📄 Leaderboard.tsx     # Real-time player score tracker
    │       ├── 📄 Footer.tsx          # System-wide copyright and styling anchors
    │       ├── 📄 Chat.tsx            # Collaborative discussion and guessing console
    │       ├── 📄 Header.tsx          # Global title header and navigation indicators
    │       ├── 📄 Canvas.tsx          # Optimized mouse-tracking and draw-rendering board
    │       └── 📄 HowToPlay.tsx       # Informative onboarding modal for game controls
    └── 📁 public/                     # Static assets directory
        ├── 📄 drawly-og-image.png     # OpenGraph preview card
        └── 📄 drawly-icon.svg         # Scalable Vector Graphics application icon
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **TypeScript:** v5.0+ (installed via devDependencies)

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/vikasingh0897/Drawly.git
    cd vikasingh0897-Drawly-190ebe0
    ```

2.  **Backend Setup**

    ```bash
    cd backend
    npm install
    npm start
    ```

3.  **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Running the Development Environment**
    - **Start Backend:**
      ```bash
      cd backend
      npm start
      ```
    - **Start Frontend:**
      ```bash
      cd frontend
      npm run dev
      ```

---

## 🔧 Usage

### Running the Game

1.  Navigate to `https://drawly-frontend.onrender.com/` in your browser.
2.  Enter a display name on the `LandingPage` and click **Create Room**.
3.  Share the generated room code with friends, who can enter it to join.
4.  Once the game begins, the active drawer selects a secret word and begins drawing on `Canvas.tsx`.

### Viewing Results

- Upon each successful guess, the `Leaderboard.tsx` updates instantly with new point totals.
- The `Chat.tsx` panel filters the guessed word from the public feed, preserving the challenge for remaining players.
- At the end of each round, the game engine rotates to the next drawer and begins a new turn automatically.

### Available Scripts (Frontend)

Run these commands from the `/frontend` directory:

- **`npm run dev`**: Boots up the local development preview with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles TypeScript assets and generates production-optimized client assets via Vite.
- **`npm run lint`**: Analyzes the frontend codebase for formatting and stylistic rule violations using ESLint.
- **`npm run preview`**: Launches a local preview server to test the production build directory locally.

---

## 🤝 Contributing

We welcome contributions to improve Drawly! Your input helps make this project better for everyone.

### How to Contribute

1. **Fork the repository** - Click the 'Fork' button at the top right of this page
2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature

   ```

3. **Make your changes** - Improve code, documentation, or features
4. **Test thoroughly** - Ensure all functionality works as expected
   ```bash
   npm run build
   ```
5. **Commit your changes** - Write clear, descriptive commit messages
   ```bash
   git commit -m 'Add: Amazing new feature that improves real-time sync'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** - Submit your changes for review

---

<div align="center">

### ⭐ If this repository helps you, please give it a star! ⭐

**Happy Coding! 🚀**

---

_Created with ❤️ by Vikas Singh_

</div>
