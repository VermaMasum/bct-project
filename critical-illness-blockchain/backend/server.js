require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ethers = require("ethers");

const wallet = new ethers.Wallet(
  "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
  provider
);
// const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const app = express();
app.use(express.json());
app.use(cors());

const contractAddress = " 0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace this
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = provider.getSigner(0);

const contractABI = [
  /* Add your contract ABI here */

  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "patient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "illness",
        type: "string",
      },
    ],
    name: "PatientRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "patient",
        type: "address",
      },
    ],
    name: "TreatmentApproved",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
    ],
    name: "approveTreatment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
    ],
    name: "getPatientDetails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "patients",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "illness",
        type: "string",
      },
      {
        internalType: "address",
        name: "patientAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isApproved",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_illness",
        type: "string",
      },
    ],
    name: "registerPatient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = { contractABI };

const contract = new ethers.Contract(contractAddress, contractABI, signer);

app.get("/admin", async (req, res) => {
  try {
    const admin = await contract.getAdmin();
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
