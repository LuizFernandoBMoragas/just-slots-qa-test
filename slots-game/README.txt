Slot Machine Game

This is a simple **Slot Machine** game built with PixiJS and TypeScript, featuring spinning reels, win animations, and sound effects. The project also includes automated end-to-end tests using Playwright and Cucumber (BDD) — emphasizing quality assurance best practices.

---

Features

- 4 reels with multiple symbols each
- Spinning animation with staggered reel starts and stops
- Win animation triggered randomly after spin
- Sound effects for spinning and winning
- Automated UI tests covering:
  - Spin button interaction
  - Reels spinning state
  - Win animation appearance and disappearance

---

Getting Started

Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

Installation

1. Clone the repository:
   git clone https://github.com/LuizFernandoBMoragas/just-slots-qa-test.git
   cd slot-machine

2. Install dependencies:
   npm install

3. Start the local server:
   npm run start

4. Open your browser at http://localhost:9000 to play the game.

---

Testing (QA Focus)

Automated testing is a critical part of this project, ensuring reliability and regression safety.

Test Frameworks & Tools

- Playwright — for browser automation and interaction
- Cucumber (BDD) — to define behavior-driven test scenarios in Gherkin syntax
- TypeScript — for type safety in test code
- Page Object Model — to encapsulate UI interaction logic, improving maintainability

Test Coverage

- Spin Button Functionality — verifies that clicking the spin button triggers reel spinning
- Reels Spinning State — checks that reels correctly reflect the spinning state during play
- Win Animation — asserts that the victory animation appears and disappears correctly after a win

Running Tests

Run all automated tests with:

npm run test

To run tests with detailed debugging output:

npm run test:debug

Test Implementation Highlights

- Tests use DOM attribute checks (e.g., data-spinning) to assert reel states.
- The visibility of the win animation is checked via a custom window flag exposed by the game.
- Behavior-driven steps facilitate clear, human-readable test scenarios that can be extended easily.
- The test suite can be expanded with mocks or API hooks to force win states for more deterministic testing.

---

Project Structure

- src/ - Main game source code
- src/pages/SlotMachinePage.ts - Playwright page object encapsulating UI actions
- src/tests/features/ - Cucumber feature files (test scenarios)
- src/tests/steps/ - Step definitions for tests
- src/tests/support/ - Test setup and global hooks
- src/assets
- src/slots
- src/UI
- src/utils
- src/Game.ts
- src/index.html
- src/index.ts

---

License

MIT License © Luiz Fernando Barros Moragas
