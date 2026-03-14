import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import axios from "axios";
import "xterm/css/xterm.css";

function App() {
  const termRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [instances, setInstances] = useState<any[]>([]);

  useEffect(() => {
    const xterm = new Terminal();
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    if (termRef.current) {
      xterm.open(termRef.current);
      fitAddon.fit();
    }
    setTerminal(xterm);
  }, []);

  const startInstance = async () => {
    const res = await axios.post("http://localhost:8080/start_instance");
    alert(`Instance started: ${res.data.id}`);
    listInstances();
  };

  const listInstances = async () => {
    const res = await axios.get("http://localhost:8080/list_instances");
    setInstances(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>LinuxBox</h1>
      <button onClick={startInstance}>Start Ubuntu Container</button>
      <button onClick={listInstances}>Refresh Instances</button>
      <ul>
        {instances.map(inst => (
          <li key={inst.id}>
            {inst.image} - {inst.status}
          </li>
        ))}
      </ul>
      <div
        ref={termRef}
        style={{
          width: "800px",
          height: "400px",
          border: "1px solid black",
          marginTop: "20px"
        }}
      ></div>
    </div>
  );
}

export default App;
