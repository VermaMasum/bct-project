// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Healthcare {
    address public owner;

    enum Role { Patient, Doctor, Staff }
    enum Activity { ToConsult, Surgery, MedicineDistribution }
    
    struct User {
        address userAddress;
        Role role;
        bool isRegistered;
    }
    
    struct MedicalRecord {
        uint id;
        address patient;
        address doctor;
        Activity activity;
        string dataHash; // Encrypted medical data
        bool approved;
    }

    mapping(address => User) public users;
    mapping(uint => MedicalRecord) public records;
    uint public recordCount;
    
    event UserRegistered(address user, Role role);
    event RecordCreated(uint id, address patient, Activity activity);
    event RecordApproved(uint id, address doctor);
    event PaymentMade(address payer, uint amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    modifier onlyRole(Role _role) {
        require(users[msg.sender].isRegistered && users[msg.sender].role == _role, "Access denied");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerUser(address _user, Role _role) public onlyOwner {
        users[_user] = User(_user, _role, true);
        emit UserRegistered(_user, _role);
    }
    
    function createMedicalRecord(Activity _activity, string memory _dataHash) public onlyRole(Role.Patient) {
        recordCount++;
        records[recordCount] = MedicalRecord(recordCount, msg.sender, address(0), _activity, _dataHash, false);
        emit RecordCreated(recordCount, msg.sender, _activity);
    }
    
    function approveMedicalRecord(uint _id) public onlyRole(Role.Doctor) {
        require(records[_id].patient != address(0), "Invalid record");
        records[_id].doctor = msg.sender;
        records[_id].approved = true;
        emit RecordApproved(_id, msg.sender);
    }
    
    function makePayment() public payable {
        require(msg.value > 0, "Invalid payment amount");
        emit PaymentMade(msg.sender, msg.value);
    }
}