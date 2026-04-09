// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import { getContract } from "./contracts/CriticalIllness";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [illness, setIllness] = useState("");
  const [patientData, setPatientData] = useState(null);

  const registerPatient = async () => {
    try {
      const contract = await getContract();
      await contract.registerPatient(name, age, illness);
      alert("Patient registered successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const getPatient = async () => {
    try {
      const contract = await getContract();
      const [pName, pAge, pIllness] = await contract.getPatient(
        await contract.signer.getAddress()
      );
      setPatientData({ name: pName, age: pAge.toString(), illness: pIllness });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blockchain Critical Illness System</h1>

      <h2>Register Patient</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Illness"
        onChange={(e) => setIllness(e.target.value)}
      />
      <button onClick={registerPatient}>Register</button>

      <h2>Retrieve Patient Data</h2>
      <button onClick={getPatient}>Get My Details</button>
      {patientData && (
        <div>
          <p>
            <strong>Name:</strong> {patientData.name}
          </p>
          <p>
            <strong>Age:</strong> {patientData.age}
          </p>
          <p>
            <strong>Illness:</strong> {patientData.illness}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
