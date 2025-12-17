// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      items: [
        'module-1-ros2-nervous-system/introduction-to-ros2',
        'module-1-ros2-nervous-system/communication-model',
        'module-1-ros2-nervous-system/robot-structure-urdf'
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      items: [
        'module-2-digital-twin-simulation/physics-simulation-gazebo',
        'module-2-digital-twin-simulation/digital-twins-hri-unity',
        'module-2-digital-twin-simulation/sensor-simulation-validation'
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
      items: [
        'module-3-isaac-ai-brain/introduction-to-isaac-sim',
        'module-3-isaac-ai-brain/isaac-ros-vslam-navigation',
        'module-3-isaac-ai-brain/nav2-humanoid-path-planning'
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        'vla-module/voice-to-action-whisper',
        'vla-module/cognitive-planning-llms',
        'vla-module/capstone-autonomous-humanoid'
      ],
    },
  ],
};

export default sidebars;
