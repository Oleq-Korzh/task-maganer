import Snowfall from "react-snowfall";

import styles from "./MainPage.module.scss";

const MainPage = () => {


  return (
    <div className={styles.MainPage}>
      <Snowfall
        snowflakeCount={200} />
      <div className={styles.heroSection}>
        <h1>Welcome to Project Manager</h1>
        <p>Organize your projects and tasks efficiently</p>
        <div className={styles.ctaButtons}>
          <button className={styles.primaryBtn}>Get Started</button>
          <button className={styles.secondaryBtn}>Learn More</button>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <h2>Key Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📋</div>
            <h3>Project Management</h3>
            <p>Create and organize projects with ease</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✅</div>
            <h3>Task Tracking</h3>
            <p>Keep track of all your tasks in one place</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Priority System</h3>
            <p>Set priorities to focus on what matters</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Progress Monitoring</h3>
            <p>Track your progress in real-time</p>
          </div>
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statItem}>
          <h3>500+</h3>
          <p>Active Users</p>
        </div>
        <div className={styles.statItem}>
          <h3>10K+</h3>
          <p>Projects Created</p>
        </div>
        <div className={styles.statItem}>
          <h3>50K+</h3>
          <p>Tasks Completed</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
