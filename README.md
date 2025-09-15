Pick-e-eater (frontend)

A family meal planner to help log individual preferences and choose meals based on who's eating.

Features:

- Add meals to the roster. 
- Add and remove meals from each persons preferences. 
- Select whos eating and incompatible meals are automatically removed.
- Deselecting who's eating adds filtered out meals back into roster. 
- Meals can be further filtered by their difficulty, type and main ingredient.
- Randomiser selects up to 7 random meals from the filtered roster. 


Prerequisites
Before running this project, make sure you have:

Node.js (v14 or higher)


Installation
npm or yarn package manager 🛠️ Installation

Clone the repository git clone https://github.com/aamcn/pick-e-eater-frontend cd pick-e-eater-frontend

Install dependencies npm install

Set up environment variables Update POST and GET URLS to your own backend and database properties.


Run the in development. npm run dev

The app will start on http://localhost:5173

Development
Code Quality Tools ESLint: Code linting and style enforcement Prettier: Code formatting

Running with Development Tools

Run ESLint
npx eslint .

Format code with Prettier
npx prettier --write .

Backend Integration
This front end is designed to work with the pick-e-eater-backend application. The frontend makes requests to these endpoints to:

-Submit meal preference changes for stored 'diners'.
-Submit new meals to add to the roster.
-Get all stored diners 
-Get all stored meals 


Database Schema

Author
Aaron McNulty Link: https://github.com/aamcn/pick-e-eater-frontend GitHub: @aamcn

