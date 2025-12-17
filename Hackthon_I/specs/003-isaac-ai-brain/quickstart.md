# Quickstart: Isaac AI Brain for Humanoid Robotics

## Getting Started

This quickstart guide will help you set up the Docusaurus documentation site and begin working with the Isaac AI Brain educational content.

### Prerequisites

- Node.js (version 18.0 or higher)
- npm or yarn package manager
- Git for version control
- Basic knowledge of Markdown syntax
- Familiarity with robotics concepts (helpful but not required)

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

4. **Navigate to the Isaac AI Brain module**
   Once the server is running, you can access the Isaac AI Brain module at:
   - Main documentation: `http://localhost:3000`
   - Module 3: `http://localhost:3000/docs/module-2-digital-twin-simulation/physics-simulation-gazebo`

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

The Isaac AI Brain module consists of three main chapters:

1. **Introduction to NVIDIA Isaac Sim & Synthetic Data** (`physics-simulation-gazebo.md`)
   - Covers Isaac Sim basics and synthetic data generation
   - Photorealistic simulation concepts
   - Environment creation in Isaac Sim

2. **Isaac ROS: Accelerated Perception & Navigation** (`digital-twins-hri-unity.md`)
   - Explains Isaac ROS packages for perception
   - VSLAM (Visual Simultaneous Localization and Mapping) concepts
   - Navigation with Isaac packages

3. **Nav2 for Humanoid Path Planning** (`sensor-simulation-validation.md`)
   - Details Nav2 architecture and components
   - Path planning algorithms for humanoid robots
   - Motion planning for bipedal locomotion

### Running Tests

To ensure the documentation is valid and links work correctly:

```bash
npm run serve
# This serves the built documentation
```

Additionally, you can run link checking tools to verify all internal and external links work correctly.

### Deployment

The documentation is designed to be deployed on GitHub Pages. The build process creates optimized static files that can be served from any web server.