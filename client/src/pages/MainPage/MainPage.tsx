import "./MainPage.css";

export default function MainPage() {
  return (
    <div className="MainPage">
      <div className="hero-section">
        <h1>Welcome to Project Manager</h1>
        <p>Organize your projects and tasks efficiently</p>
        <div className="cta-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Project Management</h3>
            <p>Create and organize projects with ease</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Task Tracking</h3>
            <p>Keep track of all your tasks in one place</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Priority System</h3>
            <p>Set priorities to focus on what matters</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Monitoring</h3>
            <p>Track your progress in real-time</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <h3>500+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-item">
          <h3>10K+</h3>
          <p>Projects Created</p>
        </div>
        <div className="stat-item">
          <h3>50K+</h3>
          <p>Tasks Completed</p>
        </div>
      </div>
    </div>
  );
}
