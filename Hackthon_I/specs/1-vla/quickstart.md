# Quickstart Guide: Vision-Language-Action (VLA) Module

**Feature**: 1-vla (Vision-Language-Action Module)
**Date**: 2025-12-17
**Status**: Complete

## Overview

This quickstart guide provides step-by-step instructions to set up and run the Vision-Language-Action (VLA) module, enabling voice-controlled humanoid robot execution through LLM-powered cognitive planning.

## Prerequisites

### System Requirements
- Ubuntu 22.04 LTS (recommended) or compatible Linux distribution
- Python 3.11 or higher
- At least 8GB RAM (16GB recommended for simulation)
- ROS 2 Humble Hawksbill installed
- OpenAI API key

### Software Dependencies
- Git
- Docker (optional, for containerized setup)
- Gazebo simulation environment (for robot simulation)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-organization/youtube-hackathon-1.git
cd youtube-hackathon-1
git checkout 1-vla
```

### 2. Set Up Python Environment
```bash
# Create virtual environment
python3 -m venv vla_env
source vla_env/bin/activate  # On Windows: vla_env\Scripts\activate

# Install Python dependencies
pip install --upgrade pip
pip install openai rclpy ros2 numpy pydub
```

### 3. Install ROS 2 Dependencies
```bash
# Install ROS 2 Humble (if not already installed)
# Follow official ROS 2 installation guide: https://docs.ros.org/en/humble/Installation.html

# Install additional ROS packages
sudo apt update
sudo apt install ros-humble-gazebo-ros-pkgs ros-humble-navigation2 ros-humble-nav2-bringup
```

### 4. Configure Environment Variables
Create a `.env` file in the project root:

```bash
# OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here

# ROS 2 configuration
ROS_DOMAIN_ID=42
ROS_LOG_DIR=./logs

# Audio configuration
AUDIO_DEVICE_INDEX=0
WHISPER_MODEL=whisper-1
LLM_MODEL=gpt-4-turbo
```

### 5. Set Up Docusaurus for Documentation
```bash
# Install Node.js if not already installed
# Then install Docusaurus dependencies
cd book
npm install
```

## Running the VLA System

### 1. Start ROS 2 Environment
```bash
# Source ROS 2 environment
source /opt/ros/humble/setup.bash
source install/setup.bash  # If you have built packages

# In a new terminal, start ROS 2 daemon
ros2 daemon start
```

### 2. Launch Robot Simulation (Optional)
```bash
# Launch Gazebo simulation with a humanoid robot
ros2 launch vla_simulation.launch.py
```

### 3. Run Voice Command Processing
```bash
# In your project directory with activated virtual environment
python3 -m vla.voice_to_action --api-key $OPENAI_API_KEY
```

### 4. Test the Complete Pipeline
```bash
# Run the end-to-end demonstration
python3 -m vla.demo --simulation-mode
```

## Chapter-Specific Examples

### Chapter 1: Voice-to-Action with OpenAI Whisper

```python
# Example code from Chapter 1
from vla.voice_processor import VoiceProcessor

# Initialize the voice processor
processor = VoiceProcessor(api_key="your-api-key")

# Process audio input
result = processor.transcribe_audio("path/to/audio.wav")
print(f"Transcribed text: {result.text}")
print(f"Confidence: {result.confidence}")
```

### Chapter 2: Cognitive Planning using LLMs for ROS 2

```python
# Example code from Chapter 2
from vla.cognitive_planner import CognitivePlanner

# Initialize the planner
planner = CognitivePlanner(model="gpt-4-turbo")

# Generate a plan from natural language
command = "Go to the kitchen and bring me the red cup"
plan = planner.generate_plan(command, robot_context={})
print(f"Generated plan: {plan.action_sequence}")
```

### Chapter 3: Capstone: Autonomous Humanoid executing tasks

```python
# Example code from Chapter 3
from vla.vla_system import VLASystem

# Initialize the complete system
vla_system = VLASystem(
    openai_api_key="your-api-key",
    ros_domain_id=42,
    simulation_mode=True
)

# Execute a complete voice command
vla_system.execute_voice_command("Please go to the table and pick up the blue pen")
```

## Running the Documentation

### 1. Build and Serve Documentation
```bash
cd book
npm run build
npm run serve
```

### 2. View Documentation Locally
Open your browser and navigate to `http://localhost:3000` to view the VLA module documentation.

## Troubleshooting

### Common Issues

#### Audio Input Problems
- **Issue**: No audio input detected
- **Solution**: Check `AUDIO_DEVICE_INDEX` in your `.env` file. List available devices with:
  ```bash
  python3 -c "import pyaudio; [print(i, pyaudio.PyAudio().get_device_info_by_index(i)['name']) for i in range(pyaudio.PyAudio().get_device_count())]"
  ```

#### ROS 2 Connection Issues
- **Issue**: Cannot connect to ROS 2
- **Solution**: Ensure ROS 2 environment is sourced and daemon is running:
  ```bash
  source /opt/ros/humble/setup.bash
  ros2 daemon start
  ```

#### OpenAI API Errors
- **Issue**: API key authentication failures
- **Solution**: Verify your `OPENAI_API_KEY` in the `.env` file and ensure you have sufficient API quota.

### Performance Tips

#### Optimizing LLM Calls
- Cache common command patterns to reduce API costs
- Use appropriate model selection based on complexity needs
- Implement request batching for multiple simultaneous commands

#### Audio Processing
- Use appropriate audio formats (WAV, MP3) for best Whisper performance
- Pre-process audio to reduce background noise
- Implement streaming for real-time processing

## Next Steps

1. Complete the three VLA chapters in sequence
2. Experiment with different voice commands
3. Extend the cognitive planning with custom action types
4. Integrate with real humanoid hardware (when available)
5. Contribute improvements to the documentation

## Support and Resources

- **Documentation**: Complete VLA module documentation at `/docs/vla-module/`
- **Source Code**: Python modules in the `vla/` directory
- **Examples**: Working examples in the `examples/` directory
- **Community**: Join the project Discord/Slack for support