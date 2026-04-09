// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CriticalIllness {
    struct Patient {
        string name;
        uint age;
        string illness;
        address patientAddress;
        bool isApproved;
        bool insuranceVerified;
        uint fundsReceived;
    }

    address public admin;
    mapping(address => Patient) public patients;
    mapping(address => uint) public patientFunds;

    event PatientRegistered(address indexed patient, string name, string illness);
    event TreatmentApproved(address indexed patient);
    event InsuranceVerified(address indexed patient);
    event FundsDonated(address indexed donor, address indexed patient, uint amount);
    event FundsWithdrawn(address indexed patient, uint amount);

    constructor() {
        admin = msg.sender;
    }

    function registerPatient(string memory _name, uint _age, string memory _illness) public {
        require(patients[msg.sender].patientAddress == address(0), "Already registered");

        patients[msg.sender] = Patient(_name, _age, _illness, msg.sender, false, false, 0);
        emit PatientRegistered(msg.sender, _name, _illness);
    }

    function approveTreatment(address _patient) public {
        require(msg.sender == admin, "Only admin can approve");
        require(patients[_patient].patientAddress != address(0), "Patient not registered");

        patients[_patient].isApproved = true;
        emit TreatmentApproved(_patient);
    }

    function verifyInsurance(address _patient) public {
        require(msg.sender == admin, "Only admin can verify insurance");
        require(patients[_patient].patientAddress != address(0), "Patient not registered");

        patients[_patient].insuranceVerified = true;
        emit InsuranceVerified(_patient);
    }

    function donateFunds(address _patient) public payable {
        require(patients[_patient].patientAddress != address(0), "Patient not registered");
        require(msg.value > 0, "Donation amount must be greater than zero");

        patientFunds[_patient] += msg.value;
        patients[_patient].fundsReceived += msg.value;

        emit FundsDonated(msg.sender, _patient, msg.value);
    }

    function withdrawFunds() public {
        require(patients[msg.sender].patientAddress != address(0), "You are not a registered patient");
        require(patients[msg.sender].isApproved, "Treatment not approved");
        require(patientFunds[msg.sender] > 0, "No funds available");

        uint amount = patientFunds[msg.sender];
        patientFunds[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(msg.sender, amount);
    }

    function getPatientDetails(address _patient) public view returns (
        string memory, uint, string memory, bool, bool, uint
    ) {
        require(patients[_patient].patientAddress != address(0), "Patient not registered");

        Patient memory p = patients[_patient];
        return (p.name, p.age, p.illness, p.isApproved, p.insuranceVerified, p.fundsReceived);
    }
}
