---
sidebar_position: 2
---

# ROS 2 Communication Model

## Nodes and Their Role

In ROS 2, a node is a process that performs computation. Nodes are the fundamental unit of execution in ROS 2 and are designed to be modular, allowing complex robotics systems to be built from smaller, reusable parts.

### Key Characteristics of Nodes:
- **Modularity**: Each node typically performs a specific task or set of related tasks
- **Communication**: Nodes communicate with other nodes through topics, services, and actions
- **Isolation**: Nodes run in separate processes, providing fault isolation
- **Flexibility**: Nodes can be written in different programming languages and run on different machines

### Creating a Node:
A node in ROS 2 is an instantiation of a node class that provides the execution context for the callback functions. In Python, this is typically done by subclassing `rclpy.Node`, while in C++ it involves inheriting from `rclcpp::Node`.

## Topics and Pub/Sub Pattern

Topics enable asynchronous, many-to-many communication using a publish/subscribe pattern. Publishers send messages to topics, and subscribers receive messages from topics.

### Topic Communication Characteristics:
- **Asynchronous**: Publishers and subscribers don't need to run simultaneously
- **Loose coupling**: Publishers don't know who subscribes, and subscribers don't know who publishes
- **Many-to-many**: Multiple publishers can publish to the same topic, and multiple subscribers can subscribe to the same topic
- **Data flow**: Unidirectional from publisher to subscriber

### Quality of Service (QoS) Settings:
ROS 2 provides QoS settings that allow fine-tuning of communication behavior:
- **Reliability**: Reliable (all messages delivered) or Best Effort (no guarantee)
- **Durability**: Volatile (new subscribers don't get old messages) or Transient Local (new subscribers get last message)
- **History**: Keep Last (maintain last N messages) or Keep All (maintain all messages)

## Services and Request/Response

Services provide synchronous, one-to-one communication using a request/response pattern. A client sends a request and waits for a response from a server.

### Service Communication Characteristics:
- **Synchronous**: Client blocks until response is received
- **One-to-one**: One client communicates with one server
- **Request/Response**: Bidirectional data flow during the interaction
- **Stateless**: Each request is independent of others

### Service Types:
- **Standard services**: Simple request/response pattern
- **Multiple service servers**: A client can potentially communicate with multiple servers (though typically designed for one)

## Basic rclpy-based Agent ↔ Controller Flow

The agent ↔ controller communication pattern is common in robotics applications where an intelligent agent makes decisions and sends commands to a controller that executes them.

### Example Agent ↔ Controller Flow:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from example_interfaces.srv import SetBool  # Example service

class RobotAgent(Node):
    def __init__(self):
        super().__init__('robot_agent')
        self.publisher_ = self.create_publisher(String, 'robot_commands', 10)
        self.timer = self.create_timer(0.5, self.agent_logic)

    def agent_logic(self):
        # Agent makes decisions based on some logic
        command = String()
        command.data = 'move_forward'
        self.publisher_.publish(command)

class RobotController(Node):
    def __init__(self):
        super().__init__('robot_controller')
        self.subscription = self.create_subscription(
            String,
            'robot_commands',
            self.command_callback,
            10)
        self.subscription  # prevent unused variable warning

    def command_callback(self, msg):
        # Execute the command received from the agent
        self.get_logger().info(f'Received command: {msg.data}')
        # Perform actual robot control based on command
```

### Communication Flow:
1. **Agent Decision**: The agent node processes sensor data and makes decisions
2. **Command Publication**: The agent publishes commands to a topic
3. **Command Reception**: The controller subscribes to the command topic
4. **Execution**: The controller executes the received commands
5. **Feedback**: Optionally, the controller can publish status updates back to the agent

## Practical Examples and Code Snippets

### Simple Publisher Example:
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1
```

### Simple Subscriber Example:
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')
```

## Learning Objectives

After completing this chapter, you should be able to:
- Understand the role of nodes in ROS 2 architecture
- Explain the publish/subscribe communication pattern and its use cases
- Describe service-based communication and when to use it
- Implement basic agent ↔ controller communication patterns using rclpy
- Apply appropriate Quality of Service settings for different communication needs

## Hands-On Exercises

1. Create a simple publisher and subscriber pair that communicate sensor data
2. Implement a service server that toggles a robot's operational state
3. Design an agent and controller node that communicate using the patterns described above
4. Experiment with different QoS settings and observe their effects on communication

## References and Further Reading

All information in this module is sourced from official ROS 2 documentation:
- ROS 2 Concepts: https://docs.ros.org/en/humble/Concepts.html
- ROS 2 Topics: https://docs.ros.org/en/humble/Tutorials/Topics.html
- ROS 2 Services: https://docs.ros.org/en/humble/Tutorials/Services.html
- ROS 2 Actions: https://docs.ros.org/en/humble/Tutorials/Actions.html
- Quality of Service: https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html

For this educational module, we're using official ROS 2 documentation and examples as our primary source of information, ensuring technical accuracy and best practices.