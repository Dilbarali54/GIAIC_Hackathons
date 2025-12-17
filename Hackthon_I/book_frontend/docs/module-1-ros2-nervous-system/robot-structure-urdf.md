---
sidebar_position: 3
---

# Robot Structure with URDF

## Understanding URDF (Unified Robot Description Format)

URDF (Unified Robot Description Format) is an XML-based format used in ROS to describe the physical and kinematic properties of robots. It provides a complete description of a robot's structure, including its links, joints, and other properties.

### Key Components of URDF:

**Links**: Represent rigid bodies of the robot. Each link has:
- Physical properties (mass, inertia, visual, and collision properties)
- A unique name
- Optional visual and collision descriptions

**Joints**: Define the connection between links. Each joint has:
- Type (revolute, continuous, prismatic, fixed, floating, planar)
- Limits (for position, velocity, and effort)
- Origin (position and orientation relative to parent link)

**Materials**: Define the appearance properties for visualization.

### URDF Structure Example:
```xml
<?xml version="1.0"?>
<robot name="my_robot">
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
  </link>

  <link name="upper_link">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.2"/>
      </geometry>
    </visual>
  </link>

  <joint name="base_upper_joint" type="revolute">
    <parent link="base_link"/>
    <child link="upper_link"/>
    <origin xyz="0 0 0.3" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-3.14" upper="3.14" effort="100" velocity="1"/>
  </joint>
</robot>
```

## URDF for Humanoid Robots

Humanoid robots have specific structural requirements that need to be carefully modeled in URDF:

### Key Considerations for Humanoid URDF:
- **Symmetry**: Often have symmetrical limbs (arms, legs)
- **Degrees of Freedom**: Multiple joints to enable human-like movement
- **Center of Mass**: Critical for balance and stability
- **Kinematic Chains**: Complex chains for arms, legs, and spine

### Typical Humanoid Robot Structure:
- **Torso**: Main body with head, arms, and legs attached
- **Head**: Usually with sensors (cameras, IMUs)
- **Arms**: Shoulders, elbows, wrists, and possibly hands/fingers
- **Legs**: Hips, knees, ankles, and feet
- **Actuators**: Motors or servos at each joint

### Example Humanoid Joint Structure:
```xml
<!-- Simplified humanoid leg structure -->
<joint name="hip_joint" type="revolute">
  <parent link="torso"/>
  <child link="thigh"/>
  <origin xyz="0 -0.1 -0.1" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-1.57" upper="1.57" effort="100" velocity="2"/>
</joint>

<joint name="knee_joint" type="revolute">
  <parent link="thigh"/>
  <child link="shin"/>
  <origin xyz="0 0 -0.5" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="0" upper="3.14" effort="100" velocity="2"/>
</joint>
```

## Creating Basic URDF Files

### Step-by-Step URDF Creation Process:

1. **Define the robot structure**: Identify all links and joints
2. **Set the base link**: Choose a reference frame (usually the main body)
3. **Add physical properties**: Mass, inertia, visual and collision geometries
4. **Define joints**: Connect links with appropriate joint types
5. **Validate the URDF**: Check for errors and kinematic loops

### Best Practices:
- Start with a simple model and gradually add complexity
- Use consistent naming conventions
- Ensure all units are consistent (SI units recommended)
- Validate the kinematic tree (no loops)
- Include safety limits for joints

## Simulation Readiness Requirements

For a URDF model to be simulation-ready, it must meet specific requirements:

### Physical Properties:
- Accurate mass and inertia values for each link
- Proper center of mass placement
- Realistic joint limits and dynamics

### Visual Properties:
- Appropriate visual geometries for rendering
- Materials and textures for visualization
- Collision geometries that match visual models or are simplified for performance

### Gazebo-Specific Elements:
```xml
<gazebo reference="link_name">
  <material>Gazebo/Blue</material>
  <mu1>0.9</mu1>
  <mu2>0.9</mu2>
</gazebo>

<gazebo>
  <plugin name="robot_state_publisher" filename="libgazebo_ros_robot_state_publisher.so">
    <robotNamespace>/</robotNamespace>
  </plugin>
</gazebo>
```

### Control Interface Preparation:
- Include transmission elements for actuator control
- Define joint controllers in separate configuration files
- Prepare for ROS control integration

## Practical URDF Examples

### Complete Simple Robot Example:
```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.3 0.2 0.4"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.2 0.4"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="5"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.2" iyz="0.0" izz="0.3"/>
    </inertial>
  </link>

  <!-- Head -->
  <link name="head">
    <visual>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
      <material name="white">
        <color rgba="1 1 1 1"/>
      </material>
    </visual>
  </link>

  <joint name="neck_joint" type="fixed">
    <parent link="base_link"/>
    <child link="head"/>
    <origin xyz="0 0 0.3"/>
  </joint>
</robot>
```

## Learning Objectives

After completing this chapter, you should be able to:
- Understand the structure and components of URDF files
- Create URDF descriptions for humanoid robots
- Define proper links, joints, and physical properties
- Prepare URDF models for simulation environments
- Validate URDF files for correctness and completeness

## Hands-On Exercises

1. Create a simple URDF file for a basic robot with at least 3 links and 2 joints
2. Use the `check_urdf` command to validate your URDF file
3. Visualize your robot model in RViz using the `robot_state_publisher`
4. Create a simplified humanoid model with torso, head, and limbs
5. Add Gazebo-specific elements to make your model simulation-ready

## References and Further Reading

All information in this module is sourced from official ROS 2 documentation:
- URDF Tutorials: https://docs.ros.org/en/humble/Tutorials/URDF/URDF-Tutorials.html
- URDF/XML Format: https://wiki.ros.org/urdf/XML
- Robot State Publisher: https://docs.ros.org/en/humble/p/robot_state_publisher/
- Gazebo Integration: https://gazebosim.org/docs/harmonic/ros_integration/

For this educational module, we're using official ROS 2 documentation and examples as our primary source of information, ensuring technical accuracy and best practices.