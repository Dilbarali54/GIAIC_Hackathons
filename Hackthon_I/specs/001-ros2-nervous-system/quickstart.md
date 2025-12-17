# Quickstart: ROS 2 Nervous System for Humanoid Robots

## Getting Started

This quickstart guide will help you set up the Docusaurus documentation site and begin working with the ROS 2 educational content.

### Prerequisites

- Node.js (version 18.0 or higher)
- npm or yarn package manager
- Git for version control
- Basic knowledge of Markdown syntax

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

4. **Navigate to the ROS 2 module**
   Once the server is running, you can access the ROS 2 module at:
   - Main documentation: `http://localhost:3000`
   - Module 1: `http://localhost:3000/docs/module-1-ros2-nervous-system/introduction-to-ros2`

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
   - Open `docs/module-1-ros2-nervous-system/introduction-to-ros2.md`
   - Make changes to the markdown file
   - The browser reloads automatically and displays the updated content

2. **Create a new doc**:
   - Create a new `.md` file in the `docs/module-1-ros2-nervous-system/` directory
   - Add it to the sidebar by modifying the `_category_.json` file

3. **Versioning**:
   - To create a documentation version: `npm run docusaurus docs:version 1.0.0`
   - This creates a new versioned directory with the current content

### Documentation Structure

The ROS 2 module consists of three main chapters:

1. **Introduction to ROS 2 for Physical AI** (`introduction-to-ros2.md`)
   - Covers basic ROS 2 concepts and DDS fundamentals
   - Explains why ROS 2 matters for humanoid robots

2. **ROS 2 Communication Model** (`communication-model.md`)
   - Details nodes, topics, and services
   - Provides practical examples with rclpy
   - Demonstrates agent ↔ controller flow

3. **Robot Structure with URDF** (`robot-structure-urdf.md`)
   - Explains URDF for humanoid robots
   - Shows how to create valid URDF files
   - Covers simulation readiness requirements

### Running Tests

To ensure the documentation is valid and links work correctly:

```bash
npm run serve
# This serves the built documentation
```

Additionally, you can run link checking tools to verify all internal and external links work correctly.

### Deployment

The documentation is designed to be deployed on GitHub Pages. The build process creates optimized static files that can be served from any web server.