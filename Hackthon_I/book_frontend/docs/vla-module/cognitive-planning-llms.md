---
sidebar_position: 2
title: "Cognitive Planning using LLMs for ROS 2"
---

# Cognitive Planning using LLMs for ROS 2

## Introduction

In this chapter, we'll explore how to use Large Language Models (LLMs) for cognitive planning, converting natural language commands into sequences of ROS 2 actions. This is the intelligence layer of the Vision-Language-Action (VLA) pipeline, where high-level commands are transformed into executable robotic behaviors.

## Understanding Cognitive Planning in Robotics

Cognitive planning in robotics involves translating high-level goals into low-level actions that a robot can execute. For example, when a user says "Go to the kitchen and bring me the red cup," the cognitive planner must determine:
- Navigate to the kitchen area
- Identify the red cup
- Approach the cup
- Grasp the cup
- Navigate back to the user
- Release the cup

LLMs excel at this type of reasoning, making them ideal for cognitive planning in robotics applications.

## Setting Up LLM Integration

We'll use OpenAI's GPT models for cognitive planning, though similar approaches work with other LLMs like Anthropic Claude or open-source models.

### Installation and Dependencies

```bash
pip install openai python-dotenv
```

### Basic LLM Integration

Here's a simple example of how to use an LLM for cognitive planning:

```python
import openai
from openai import OpenAI
import os
import json

class CognitivePlanner:
    def __init__(self, api_key=None, model="gpt-4-turbo"):
        """
        Initialize the cognitive planner
        """
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = model

    def generate_plan(self, command, robot_context=None):
        """
        Generate a cognitive plan from natural language command
        """
        if robot_context is None:
            robot_context = {
                "capabilities": ["move", "grasp", "speak", "navigate"],
                "environment": ["kitchen", "living room", "bedroom"],
                "objects": ["cups", "books", "boxes"]
            }

        system_prompt = f"""
        You are a cognitive planning system for a humanoid robot. Your task is to convert natural language commands into a sequence of actions that the robot can execute.

        Robot capabilities: {robot_context['capabilities']}
        Environment: {robot_context['environment']}
        Available objects: {robot_context['objects']}

        Respond with a JSON object containing:
        - "intent": The high-level intent
        - "action_sequence": An array of actions with type and parameters
        - "confidence": A confidence score between 0.0 and 1.0
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Command: {command}"}
            ],
            response_format={"type": "json_object"}
        )

        plan = json.loads(response.choices[0].message.content)
        return plan

# Example usage
# planner = CognitivePlanner()
# command = "Go to the kitchen and bring me the red cup"
# plan = planner.generate_plan(command)
# print(json.dumps(plan, indent=2))
```

## ROS 2 Action Architecture

ROS 2 uses an action architecture for long-running tasks. Actions have goals, feedback, and results. For our cognitive planning system, we'll map LLM-generated actions to ROS 2 action interfaces.

### Understanding ROS 2 Actions

ROS 2 actions are used for tasks that take time to complete and may provide feedback during execution. Common action types include:
- `nav2_msgs/MoveToPose` - Navigate to a specific pose
- `control_msgs/FollowJointTrajectory` - Control robot joints
- `manipulation_msgs/PickupObject` - Pick up objects

### Action Mapping Strategy

Our cognitive planner will map natural language to these action types:

```python
class ActionMapper:
    def __init__(self):
        """
        Map natural language actions to ROS 2 action types
        """
        self.action_mapping = {
            "navigate": "nav2_msgs/MoveToPose",
            "move": "nav2_msgs/MoveToPose",
            "go to": "nav2_msgs/MoveToPose",
            "go": "nav2_msgs/MoveToPose",
            "move to": "nav2_msgs/MoveToPose",
            "grasp": "manipulation_msgs/PickupObject",
            "pick up": "manipulation_msgs/PickupObject",
            "pickup": "manipulation_msgs/PickupObject",
            "take": "manipulation_msgs/PickupObject",
            "place": "manipulation_msgs/PlaceObject",
            "put": "manipulation_msgs/PlaceObject",
            "drop": "manipulation_msgs/PlaceObject",
            "speak": "sound_msgs/Speak",
            "say": "sound_msgs/Speak",
            "talk": "sound_msgs/Speak"
        }

    def map_action(self, action_type, parameters):
        """
        Map high-level action to ROS 2 action
        """
        ros_action = self.action_mapping.get(action_type.lower(), "unknown")
        return {
            "ros_action_type": ros_action,
            "parameters": parameters,
            "action_type": action_type
        }

# Example usage
# mapper = ActionMapper()
# mapped_action = mapper.map_action("go to", {"location": "kitchen"})
# print(mapped_action)
```

## Advanced Cognitive Planning

For more complex planning scenarios, we can implement hierarchical planning and context awareness:

```python
class AdvancedCognitivePlanner(CognitivePlanner):
    def __init__(self, api_key=None, model="gpt-4-turbo"):
        super().__init__(api_key, model)
        self.action_mapper = ActionMapper()
        self.context_history = []

    def generate_hierarchical_plan(self, command, robot_context=None):
        """
        Generate a hierarchical plan with sub-goals
        """
        if robot_context is None:
            robot_context = {
                "capabilities": ["move", "grasp", "speak", "navigate"],
                "environment": ["kitchen", "living room", "bedroom"],
                "objects": ["cups", "books", "boxes"],
                "current_location": "living room"
            }

        system_prompt = f"""
        You are a cognitive planning system for a humanoid robot. Your task is to convert natural language commands into a hierarchical sequence of actions.

        Robot capabilities: {robot_context['capabilities']}
        Environment: {robot_context['environment']}
        Available objects: {robot_context['objects']}
        Current location: {robot_context['current_location']}

        For each action in the sequence, provide:
        - "id": Unique identifier
        - "type": Action type
        - "parameters": Action parameters
        - "dependencies": List of action IDs that must complete first
        - "priority": Execution priority (1-10)
        - "timeout": Maximum time to execute in seconds

        Respond with a JSON object containing:
        - "intent": The high-level intent
        - "action_sequence": An array of detailed actions
        - "confidence": A confidence score between 0.0 and 1.0
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Command: {command}"}
            ],
            response_format={"type": "json_object"}
        )

        plan = json.loads(response.choices[0].message.content)

        # Map actions to ROS 2 actions
        for action in plan.get("action_sequence", []):
            mapped_action = self.action_mapper.map_action(action["type"], action["parameters"])
            action["ros_action"] = mapped_action

        # Add to context history
        self.context_history.append({
            "command": command,
            "plan": plan,
            "timestamp": time.time()
        })

        return plan

    def validate_plan(self, plan):
        """
        Validate the generated plan for safety and feasibility
        """
        validation_results = {
            "is_valid": True,
            "issues": [],
            "suggestions": []
        }

        # Check for dangerous actions
        for action in plan.get("action_sequence", []):
            action_type = action.get("type", "").lower()
            if action_type in ["jump", "run_fast", "throw"]:
                validation_results["is_valid"] = False
                validation_results["issues"].append(f"Potentially dangerous action: {action_type}")

        # Check for circular dependencies
        action_ids = [action["id"] for action in plan.get("action_sequence", [])]
        for action in plan.get("action_sequence", []):
            for dep in action.get("dependencies", []):
                if dep not in action_ids:
                    validation_results["issues"].append(f"Invalid dependency: {dep}")

        return validation_results
```

## Integration Patterns and Best Practices

### Safety-First Approach

Always validate LLM-generated plans before execution:

```python
def safe_execute_plan(planner, command):
    """
    Safely execute a plan with validation
    """
    plan = planner.generate_hierarchical_plan(command)
    validation = planner.validate_plan(plan)

    if not validation["is_valid"]:
        print(f"Plan validation failed: {validation['issues']}")
        print(f"Suggestions: {validation['suggestions']}")
        return None

    print(f"Plan validated successfully: {plan['intent']}")
    return plan
```

### Context-Aware Planning

Consider the robot's current state and environment:

```python
def context_aware_planning(planner, command, robot_state):
    """
    Generate plan considering current robot state
    """
    context = {
        "capabilities": robot_state.get("capabilities", []),
        "environment": robot_state.get("environment", []),
        "objects": robot_state.get("objects", []),
        "current_location": robot_state.get("location", "unknown"),
        "battery_level": robot_state.get("battery", 100),
        "gripper_status": robot_state.get("gripper", "open"),
        "current_task": robot_state.get("current_task", "none")
    }

    return planner.generate_hierarchical_plan(command, context)
```

## Practical Example: Complete Cognitive Planning System

Let's create a complete cognitive planning system:

```python
import time
import json
from typing import Dict, List, Any

class CompleteCognitivePlanner:
    def __init__(self, api_key=None, model="gpt-4-turbo"):
        """
        Complete cognitive planning system
        """
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = model
        self.action_mapper = ActionMapper()
        self.context_history = []

    def generate_plan(self, command: str, robot_context: Dict = None) -> Dict:
        """
        Generate a complete cognitive plan
        """
        if robot_context is None:
            robot_context = {
                "capabilities": ["move", "grasp", "speak", "navigate"],
                "environment": ["kitchen", "living room", "bedroom"],
                "objects": ["cups", "books", "boxes"],
                "current_location": "living room"
            }

        system_prompt = f"""
        You are a cognitive planning system for a humanoid robot. Your task is to convert natural language commands into a detailed sequence of actions.

        Robot capabilities: {robot_context['capabilities']}
        Environment: {robot_context['environment']}
        Available objects: {robot_context['objects']}
        Current location: {robot_context['current_location']}

        For each action in the sequence, provide:
        - "id": Unique identifier (use format: action_001, action_002, etc.)
        - "type": Action type (navigate, grasp, speak, etc.)
        - "parameters": Action parameters (location, object, text, etc.)
        - "dependencies": List of action IDs that must complete first (empty list if none)
        - "priority": Execution priority (1-10, 1 being highest)
        - "timeout": Maximum time to execute in seconds

        Respond with a JSON object containing:
        - "plan_id": Unique identifier for this plan
        - "command": The original command
        - "intent": The high-level intent
        - "action_sequence": An array of detailed actions
        - "confidence": A confidence score between 0.0 and 1.0
        - "estimated_duration": Estimated time in seconds
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Command: {command}"}
            ],
            response_format={"type": "json_object"}
        )

        plan = json.loads(response.choices[0].message.content)

        # Map actions to ROS 2 actions
        for action in plan.get("action_sequence", []):
            mapped_action = self.action_mapper.map_action(action["type"], action["parameters"])
            action["ros_action"] = mapped_action

        # Add to context history
        self.context_history.append({
            "command": command,
            "plan": plan,
            "timestamp": time.time()
        })

        return plan

    def validate_plan(self, plan: Dict) -> Dict:
        """
        Validate the generated plan for safety and feasibility
        """
        validation_results = {
            "is_valid": True,
            "issues": [],
            "suggestions": []
        }

        # Check for dangerous actions
        dangerous_actions = ["jump", "run_fast", "throw", "hit", "break"]
        for action in plan.get("action_sequence", []):
            action_type = action.get("type", "").lower()
            if action_type in dangerous_actions:
                validation_results["is_valid"] = False
                validation_results["issues"].append(f"Potentially dangerous action: {action_type}")

        # Check for circular dependencies
        action_ids = [action["id"] for action in plan.get("action_sequence", [])]
        for action in plan.get("action_sequence", []):
            for dep in action.get("dependencies", []):
                if dep not in action_ids:
                    validation_results["issues"].append(f"Invalid dependency: {dep}")

        return validation_results

    def execute_plan(self, plan: Dict) -> Dict:
        """
        Execute the plan (simulated for this example)
        """
        validation = self.validate_plan(plan)
        if not validation["is_valid"]:
            return {
                "status": "failed",
                "reason": f"Plan validation failed: {validation['issues']}",
                "results": []
            }

        results = []
        print(f"Executing plan: {plan['intent']}")

        # Simulate execution (in real implementation, this would call ROS 2 actions)
        for i, action in enumerate(plan.get("action_sequence", [])):
            print(f"Step {i+1}/{len(plan['action_sequence'])}: {action['type']} - {action['parameters']}")

            # Simulate action execution
            result = {
                "action_id": action["id"],
                "status": "success",
                "execution_time": 2.0,  # Simulated time
                "result_data": f"Action {action['type']} completed"
            }
            results.append(result)

            time.sleep(0.5)  # Simulate execution delay

        return {
            "status": "completed",
            "results": results,
            "execution_time": len(results) * 2.5
        }

# Example usage
if __name__ == "__main__":
    planner = CompleteCognitivePlanner()

    # Example command
    command = "Go to the kitchen and bring me the red cup from the table"
    print(f"Processing command: {command}")

    # Generate plan
    plan = planner.generate_plan(command)
    print(f"Generated plan with intent: {plan['intent']}")
    print(f"Action sequence: {len(plan['action_sequence'])} actions")

    # Execute plan
    results = planner.execute_plan(plan)
    print(f"Plan execution status: {results['status']}")
```

## Planning Algorithms and Safety Considerations

### Multi-Step Command Processing

For complex commands, break them down into sub-goals:

```python
def process_complex_command(planner, command):
    """
    Process complex commands by breaking into sub-goals
    """
    # First, ask LLM to break down the command
    breakdown_prompt = f"""
    Break down the following command into logical sub-goals:
    Command: {command}

    Respond with a JSON array of sub-goals.
    """

    response = planner.client.chat.completions.create(
        model=planner.model,
        messages=[{"role": "user", "content": breakdown_prompt}],
        response_format={"type": "json_object"}
    )

    sub_goals = json.loads(response.choices[0].message.content)

    # Generate plans for each sub-goal
    all_actions = []
    for i, sub_goal in enumerate(sub_goals):
        sub_plan = planner.generate_plan(sub_goal, {"sub_goal_index": i})
        all_actions.extend(sub_plan["action_sequence"])

    return all_actions
```

## Summary

In this chapter, we've explored cognitive planning using LLMs for ROS 2 integration. We've learned how to:
- Set up LLM integration for cognitive planning
- Map natural language to ROS 2 actions
- Implement safety validation for generated plans
- Create hierarchical planning systems
- Build context-aware planning capabilities

This cognitive planning layer is crucial for converting the text from Chapter 1 into actionable robot commands. In the next chapter, we'll integrate everything into a complete capstone demonstration system.