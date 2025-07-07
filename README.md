# DSFS – Decentralized Student Funding System

DSFS is a digital donation platform focused on transparency, community, and impact, specifically designed to fund student-led projects or support student needs—such as tuition, innovation, or community-driven ideas. Unlike traditional crowdfunding platforms, DSFS leverages decentralization and aims to integrate blockchain principles and community validation mechanisms for trustless, transparent giving.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [Usage](#usage)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## Features

- **Student Project Submissions:** Students can create profiles and submit projects or funding needs with detailed goals and objectives.
- **Community & Admin Verification:** Projects are verified and approved by community reviewers and administrators to ensure legitimacy.
- **Transparent Donations:** Donors can fund projects directly and track progress with regular updates.
- **Decentralized Principles:** Designed to integrate blockchain for transparent, tamper-proof records and decentralized validation.
- **User Dashboard:** Personalized dashboard for students and donors to manage projects, donations, and profiles.
- **Project Analytics:** Real-time analytics and progress tracking for each project.
- **Secure Wallet Integration:** Connect and manage crypto wallets for decentralized donations.
- **Responsive UI:** Modern, accessible, and mobile-friendly interface.

---

## Tech Stack

- **Frontend:** React (TypeScript), Tailwind CSS, Framer Motion, Lucide Icons
- **State Management:** React Context API
- **Routing:** React Router
- **Backend:** (Planned) Node.js/Express or similar, with RESTful API
- **Blockchain:** (Planned) Integration with smart contracts for donation tracking and project validation
- **Testing:** Jest, React Testing Library
- **Other:** Radix UI for accessible dialogs and modals

---

## Project Structure
dsfs/ 
├── public/ 
├── src/ 
│ ├── components/ # Reusable UI components (NavBar, Footer, Modals, Cards, etc.) 
│ ├── context/ # React Contexts (e.g., LoadingContext) 
│ ├── hooks/ # Custom React hooks 
│ ├── pages/ # Page components (Dashboard, Projects, Profile, About, Donations, etc.) 
│ ├── App.tsx # Main app component 
│ ├── main.tsx # Entry point 
│ └── index.css # Global styles 
├── package.json 
└── README.md


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/.......git
cd dsfs
npm install

### Running the App
npm run dev

### Core Concepts
1. Student Project Lifecycle
Submission: Students submit projects with details, objectives, and funding goals.
Verification: Community reviewers and admins verify and approve projects.
Funding: Donors contribute directly to verified projects.
Progress Tracking: Students provide updates; donors track impact transparently.
2. Decentralization & Transparency
Blockchain Integration: (Planned) All transactions and project updates will be recorded on-chain for transparency.
Community Validation: Projects are reviewed by the community to prevent fraud and ensure quality.
3. User Roles
Students: Submit and manage projects, update progress, withdraw funds.
Donors: Browse, fund, and track projects; receive updates.
Admins/Reviewers: Verify projects, manage platform integrity.

### Usage
Register/Login: Create an account as a student or donor.
Profile: Manage your profile, social links, and wallet.
Dashboard: View your projects, donations, and analytics.
Projects: Browse all projects, filter by category/status, and donate.
Donations: Track your donation history and project impact.
About: Learn more about the platform and the team.

Contributing
We welcome contributions! To get started:

### Fork the repository
Create a new branch (git checkout -b feature/your-feature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/your-feature)
Open a Pull Request

### Team
Kelvin Mukaria – Project Manager & Frontend Dev
Terry Anne – Blockchain Developer
Cesina Muchoki – UX/UI Designer
Victor Kimathi – Backend Developer
Don Artello – Backend Developer

DSFS – Empowering students, building trust, and making impact through decentralized giving.