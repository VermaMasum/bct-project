// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CriticalIllnessBlockchain {
    struct Patient {
        string name;
        uint age;
        string illness;
        address wallet;
        bool registered;
    }

    mapping(address => Patient) public patients;

    function registerPatient(string memory _name, uint _age, string memory _illness) public {
        require(!patients[msg.sender].registered, "Patient already registered");
        patients[msg.sender] = Patient(_name, _age, _illness, msg.sender, true);
    }

    function getPatient(address _patient) public view returns (string memory, uint, string memory) {
        require(patients[_patient].registered, "Patient not registered");
        return (patients[_patient].name, patients[_patient].age, patients[_patient].illness);
    }
}
