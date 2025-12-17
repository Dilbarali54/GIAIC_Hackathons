# Quickstart: Digital Twin Simulation for Humanoid Environments

## Getting Started

This quickstart guide will help you set up the Docusaurus documentation site and begin working with the Digital Twin simulation educational content.

### Prerequisites

- Node.js (version 18.0 or higher)
- npm or yarn package manager
- Git for version control
- Basic knowledge of Markdown syntax
- Access to Gazebo simulation environment (for examples)
- Access to Unity development environment (for examples)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   This command starts a local development server and opens the documentation in your browser. Most changes are reflected live without having to restart the server.

4. **Navigate to the Digital Twin module**
   Once the server is running, you can access the Digital Twin module at:
   - Main documentation: `http://localhost:3000`
   - Module 2: `http://localhost:3000/docs/module-2-digital-twin-simulation/physics-simulation-gazebo`

### Building for Production

To create a production build of the documentation:

```bash
npm run build
# or
yarn build
```

This command generates static content into the `build` directory and can be served using any static hosting service.

### Local Development

1. **Edit a doc**:
   - Open `docs/module-2-digital-twin-simulation/physics-simulation-gazebo.md`
   - Make changes to the markdown file
   - The browser reloads automatically and displays the updated content

2. **Create a new doc**:
   - Create a new `.md` file in the `docs/module-2-digital-twin-simulation/` directory
   - Add it to the sidebar by modifying the `_category_.json` file

3. **Versioning**:
   - To create a documentation version: `npm run docusaurus docs:version 1.0.0`
   - This creates a new versioned directory with the current content

### Documentation Structure

The Digital Twin module consists of three main chapters:

1. **Physics Simulation with Gazebo** (`physics-simulation-gazebo.md`)
   - Covers physics-based simulation concepts
   - Environment creation in Gazebo
   - Humanoid robot simulation

2. **Digital Twins & HRI in Unity** (`digital-twins-hri-unity.md`)
   - Explains high-fidelity digital twins
   - Human-Robot Interaction concepts
   - Unity implementation techniques

3. **Sensor Simulation & Validation** (`sensor-simulation-validation.md`)
   - Details sensor simulation (LiDAR, depth cameras, IMU)
   - Validation against real-world behavior
   - Practical examples and exercises

### Running Tests

To ensure the documentation is valid and links work correctly:

```bash
npm run serve
# This serves the built documentation
```

Additionally, you can run link checking tools to verify all internal and external links work correctly.

### Deployment

The documentation is designed to be deployed on GitHub Pages. The build process creates optimized static files that can be served from any web server.