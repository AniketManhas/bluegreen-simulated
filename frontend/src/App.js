import React, { useEffect, useState } from "react";

function App() {
  const API_URL = "https://bluegreen-backend.onrender.com"; // Your Render backend URL

  const [version, setVersion] = useState("");
  const [logs, setLogs] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("#007BFF");

  useEffect(() => {
    // Fetch health check from backend
    fetch(`${API_URL}/health`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setVersion(data.version || "Blue"); // default to Blue if backend doesn't return version
        setTheme(data.version === "Blue" ? "#007BFF" : "#00C853");
      })
      .catch(() => setVersion("Unknown"));
  }, []);

  const handleDeploy = async () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setLogs((prev) => [...prev, "🚀 Starting new deployment..."]);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 10 : 100));
    }, 300);

    try {
      const res = await fetch(`${API_URL}/api/deploy`, { method: "POST" });
      const data = await res.json();
      clearInterval(progressInterval);

      setTimeout(() => {
        setVersion(data.version);
        setTheme(data.version === "Blue" ? "#007BFF" : "#00C853");
        setLogs((prev) => [...prev, data.message]);
        setIsDeploying(false);
        setProgress(100);
      }, 300);
    } catch (error) {
      console.error(error);
      setLogs((prev) => [...prev, "❌ Deployment failed"]);
      setIsDeploying(false);
      clearInterval(progressInterval);
    }
  };

  const handleRollback = async () => {
    setLogs((prev) => [...prev, "🔁 Rolling back..."]);
    try {
      const res = await fetch(`${API_URL}/api/rollback`, { method: "POST" });
      const data = await res.json();
      setVersion(data.version);
      setTheme(data.version === "Blue" ? "#007BFF" : "#00C853");
      setLogs((prev) => [...prev, data.message]);
    } catch (error) {
      console.error(error);
      setLogs((prev) => [...prev, "❌ Rollback failed"]);
    }
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme }}>
      <h1 style={styles.title}>Blue/Green CI/CD Deployment Simulator</h1>
      <div style={styles.card}>
        <h2>
          🟢 Current Active Version:{" "}
          <span style={{ color: "yellow" }}>{version}</span>
        </h2>

        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
        </div>

        <button
          style={{ ...styles.button, backgroundColor: "#FFC107" }}
          onClick={handleDeploy}
          disabled={isDeploying}
        >
          {isDeploying ? "Deploying..." : "🚀 Switch Deployment"}
        </button>

        <button
          style={{ ...styles.button, backgroundColor: "#FF3D00" }}
          onClick={handleRollback}
          disabled={isDeploying}
        >
          🔁 Rollback
        </button>
      </div>

      <div style={styles.logs}>
        <h3>📝 Deployment Logs:</h3>
        <ul>
          {logs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    padding: "50px",
    color: "#fff",
    transition: "background-color 0.5s ease",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "600",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: "30px",
    borderRadius: "15px",
    display: "inline-block",
    width: "400px",
  },
  button: {
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  progressBarContainer: {
    backgroundColor: "#333",
    borderRadius: "10px",
    height: "10px",
    marginTop: "10px",
    marginBottom: "20px",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00E676",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },
  logs: {
    marginTop: "40px",
    textAlign: "left",
    display: "inline-block",
    maxWidth: "400px",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default App;
