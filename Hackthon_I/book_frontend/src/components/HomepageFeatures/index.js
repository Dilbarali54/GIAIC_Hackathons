import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Module 1: ROS 2 – Robot System',
    link: '/docs/module-1-ros2-nervous-system/introduction-to-ros2',
    description: (
      <>
        Learn how <strong>ROS 2</strong> works as the nervous system of humanoid
        robots, enabling communication, control, and real-time execution.
      </>
    ),
  },
  {
    title: 'Module 2: Digital Twin & Simulation',
    link: '/docs/module-2-digital-twin-simulation/physics-simulation-gazebo',
    description: (
      <>
        Create <strong>digital twins</strong> using Gazebo and understand
        physics-based simulation before real-world deployment.
      </>
    ),
  },
  {
    title: 'Module 3: Isaac Sim – AI Brain',
    link: '/docs/module-3-isaac-ai-brain/introduction-to-isaac-sim',
    description: (
      <>
        Build intelligent robot behaviors using <strong>NVIDIA Isaac Sim</strong>,
        perception pipelines, and AI-driven planning.
      </>
    ),
  },
  {
    title: 'Module 4: Voice → Action (VLA)',
    link: '/docs/vla-module/voice-to-action-whisper',
    description: (
      <>
        Convert <strong>human voice commands</strong> into robotic actions using
        Whisper and decision-making AI pipelines.
      </>
    ),
  },
];

function Feature({title, description, link}) {
  return (
    <div className={clsx('col col--3')}>
      <Link to={link} className={styles.featureCard}>
        <div className="padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
          <span className={styles.cta}>Start Module →</span>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
