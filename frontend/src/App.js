import React, { useEffect, useState } from "react";

function App() {

  const [backendMsg, setBackendMsg] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then(data => setBackendMsg(data.message))
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h1>Blue/Green CI-CD Simulation</h1>
      <h3>Frontend + Backend Working ✅</h3>
      <p>Version: 1.0.0</p>

    </div>
  );
}

export default App;
