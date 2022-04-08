pragma solidity ^0.4.25;

contract Ceers {
    string public candidate;
    struct idToAddressMapping {
        uint256 aadhaar;
        address adrs;
    }
    struct individualsDetail {
        address adr;
        string name;
        string dob;
        uint256 aadhaar;
        //address adr;
        //Employee emp;
    }
    struct University1 {
        address adrs;
        string details;
    }
    struct secondary {
        //  address adrs;
        address adrs;
        //string type_name;
        string board;
        string institute;
        string regNo;
        string yearPassing;
        string cgpa;
        uint256 percentage;
        // string specialization;
    }
    struct srSecondary {
        address adrs;
        //string type_name;
        string board;
        string institute;
        string regNo;
        string yearPassing;
        string cgpa;
        uint256 percentage;
        string specialization;
    }
    // struct university {
    //     address adrs;
    //     //string type_name;
    //     string University;
    //     string institute;
    //     string regNo;
    //     string yearPassing;
    //     string cgpa;
    //     uint256 percentage;
    //     string specialization;
    // }
    struct employee1 {
        address adrs;
        string details;
    }
    // struct employee {
    //     address adrs;
    //     string Cname;
    //     string regNo;
    //     string Eid;
    //     string dateJoining;
    //     string levelJoining;
    //     string dateLeaving;
    //     string levelLeaving;
    // }

    //request status
    enum reqStatus {Default, pending, reject, approved}
    mapping(uint256 => idToAddressMapping) public iAddresses;

    //mapping(uint => address[]) public iAddress;
    mapping(address => individualsDetail) public individualsDetails;
    mapping(address => secondary) public secondaryDetails;
    mapping(address => srSecondary) public srsecondaryDetails;
    mapping(address => University1) public newUniversityDetails;
    mapping(address => employee1) public newEmploymentDetails;
    //mapping(address => university) public universityDetails;
    //mapping(address => employee) public employeeDetails;
    uint256 public individualCount;
    uint256 public idCount;
    //address[] public allAddesses;

    uint256 randNonce = 0;

    function randMod() internal returns (address) {
        bytes20 b = bytes20(keccak256(msg.sender, now));
        uint256 addr = 0;
        for (uint256 index = b.length - 1; index + 1 > 0; index--) {
            addr += uint256(b[index]) * (16**((b.length - index - 1) * 2));
        }

        return address(addr);
    }

    function getAddrsfromId(uint256 _id) public constant returns (address) {
        return iAddresses[_id].adrs;
    }

    function getindividualdetails(uint256 _id)
        public
        constant
        returns (
            string,
            string,
            uint256
        )
    {
        address _adr = getAddrsfromId(_id);
        return (
            individualsDetails[_adr].name,
            individualsDetails[_adr].dob,
            individualsDetails[_adr].aadhaar
        );
    }

    function getNewEmploymentDetails(uint256 _id)
        public
        constant
        returns (string)
    {
        address _adr = getAddrsfromId(_id);
        return (newEmploymentDetails[_adr].details);
    }

    // function getEmployemntdetails(uint256 _id)
    //     public
    //     constant
    //     returns (
    //         string,
    //         string,
    //         string,
    //         string,
    //         string,
    //         string,
    //         string
    //     )
    // {
    //     address _adr = getAddrsfromId(_id);
    //     return (
    //         employeeDetails[_adr].Cname,
    //         employeeDetails[_adr].regNo,
    //         employeeDetails[_adr].Eid,
    //         employeeDetails[_adr].dateJoining,
    //         employeeDetails[_adr].levelJoining,
    //         employeeDetails[_adr].dateLeaving,
    //         employeeDetails[_adr].levelLeaving
    //     );
    // }

    function getSecondarydetails(uint256 _id)
        public
        constant
        returns (
            string,
            string,
            string,
            string,
            string,
            uint256
        )
    {
        address _adr = getAddrsfromId(_id);
        return (
            secondaryDetails[_adr].board,
            secondaryDetails[_adr].institute,
            secondaryDetails[_adr].regNo,
            secondaryDetails[_adr].yearPassing,
            secondaryDetails[_adr].cgpa,
            secondaryDetails[_adr].percentage
        );
    }

    function getSrSecondarydetails(uint256 _id)
        public
        constant
        returns (
            //string,
            string,
            string,
            string,
            string,
            string,
            uint256,
            string
        )
    {
        address _adr = getAddrsfromId(_id);
        return (
            //srsecondaryDetails[_adr].type_name,
            srsecondaryDetails[_adr].board,
            srsecondaryDetails[_adr].institute,
            srsecondaryDetails[_adr].regNo,
            srsecondaryDetails[_adr].yearPassing,
            srsecondaryDetails[_adr].cgpa,
            srsecondaryDetails[_adr].percentage,
            srsecondaryDetails[_adr].specialization
        );
    }

  /*  function getUniversitydetails(uint256 _id)
        public
        constant
        returns (
            string,
            string,
            string,
            string,
            string,
            uint256,
            string
        )
    {
        address _adr = getAddrsfromId(_id);
        return (
            universityDetails[_adr].University,
            universityDetails[_adr].institute,
            universityDetails[_adr].regNo,
            universityDetails[_adr].yearPassing,
            universityDetails[_adr].cgpa,
            universityDetails[_adr].percentage,
            universityDetails[_adr].specialization
        );
    }
*/
    function getNewUniversitydetails(uint256 _id)
        public
        constant
        returns (string)
    {
        address _adr = getAddrsfromId(_id);
        return (newUniversityDetails[_adr].details);
    }

    function getNewEmployementdetails(uint256 _id)
        public
        constant
        returns (string)
    {
        address _adr = getAddrsfromId(_id);
        return (newEmploymentDetails[_adr].details);
    }

    function insertAddrsfromId(uint256 _id) {
        //generate addrress
        address a = randMod();
        iAddresses[_id] = idToAddressMapping(_id, a);
        //allAddesses[idCount] = a;
        idCount++;
    }

    function addIndividualsDetail(
        uint256 _id,
        string _name,
        string _dob
    ) public {
        individualCount++;
        insertAddrsfromId(_id);
        address _address = getAddrsfromId(_id);
        individualsDetails[_address] = individualsDetail(
            _address,
            _name,
            _dob,
            _id
        );
    }

    function addSrSecondaryEducationalDetails(
        uint256 _id,
        //string _type_name,
        string _board,
        string _institute,
        string _regNo,
        string _yearPassing,
        string _cgpa,
        uint256 _percentage,
        string _specialization
    ) {
        address _address = getAddrsfromId(_id);
        srsecondaryDetails[_address] = srSecondary(
            _address,
            _board,
            _institute,
            _regNo,
            _yearPassing,
            _cgpa,
            _percentage,
            _specialization
        );
    }

    function addSecondaryEducationalDetails(
        uint256 _id,
        // string _type_name,
        string _board,
        string _institute,
        string _regNo,
        string _yearPassing,
        string _cgpa,
        uint256 _percentage // string _specialization
    ) {
        address _address = getAddrsfromId(_id);
        secondaryDetails[_address] = secondary(
            _address,
            //  _type_name,
            _board,
            _institute,
            _regNo,
            _yearPassing,
            _cgpa,
            _percentage
            // _specialization
        );
    }

    // function addUniversityDetails(
    //     uint256 _id,
    //     //string _type_name,
    //     string _University,
    //     string _institute,
    //     string _regNo,
    //     string _yearPassing,
    //     string _cgpa,
    //     uint256 _percentage,
    //     string _specialization
    // ) {
    //     address _address = getAddrsfromId(_id);
    //     universityDetails[_address] = university(
    //         _address,
    //         //  _type_name,
    //         _University,
    //         _institute,
    //         _regNo,
    //         _yearPassing,
    //         _cgpa,
    //         _percentage,
    //         _specialization
    //     );
    // }

    function addNewUniversityDetails(
        uint256 _id,
        //string _type_name,
        string newCombined
    ) {
        address _address = getAddrsfromId(_id);
        string oldCombined = newUniversityDetails[_address].details;
       // string combined = abi.encodePacked(oldCombined, newCombined);
        newUniversityDetails[_address] = University1(_address, string(abi.encodePacked(oldCombined, newCombined)));
        //newUniversityDetails[_address] = University1(_address, "test123");
    }

    function addNewEmployementDetails(
        uint256 _id,
        //string _type_name,
        string newCombined
    ) {
        address _address = getAddrsfromId(_id);
        string oldCombined = newEmploymentDetails[_address].details;
        //string combined = abi.encodePacked(oldCombined, newCombined);
        newEmploymentDetails[_address] = employee1(_address, string(abi.encodePacked(oldCombined, newCombined)));
        //newUniversityDetails[_address] = University1(_address, "test123");
    }

    // function addEmploymentDetails(
    //     uint256 _id,
    //     string _Cname,
    //     string _regNo,
    //     string _Eid,
    //     string _dateJoining,
    //     string _levelJoining,
    //     string _dateLeaving,
    //     string _levelLeaving
    // ) {
    //     address _address = getAddrsfromId(_id);
    //     employeeDetails[_address] = employee(
    //         _address,
    //         _Cname,
    //         _regNo,
    //         _Eid,
    //         _dateJoining,
    //         _levelJoining,
    //         _dateLeaving,
    //         _levelLeaving
    //     );
    // }
}
