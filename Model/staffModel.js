export default class{
    get memberCode() {
        return this._memberCode;
    }

    set memberCode(value) {
        this._memberCode = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get joinedDate() {
        return this._joinedDate;
    }

    set joinedDate(value) {
        this._joinedDate = value;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }

    set dateOfBirth(value) {
        this._dateOfBirth = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get designation() {
        return this._designation;
    }

    set designation(value) {
        this._designation = value;
    }

    get addressLine1() {
        return this._addressLine1;
    }

    set addressLine1(value) {
        this._addressLine1 = value;
    }

    get addressLine2() {
        return this._addressLine2;
    }

    set addressLine2(value) {
        this._addressLine2 = value;
    }

    get addressLine3() {
        return this._addressLine3;
    }

    set addressLine3(value) {
        this._addressLine3 = value;
    }

    get addressLine4() {
        return this._addressLine4;
    }

    set addressLine4(value) {
        this._addressLine4 = value;
    }

    get addressLine5() {
        return this._addressLine5;
    }

    set addressLine5(value) {
        this._addressLine5 = value;
    }

    get contactNo() {
        return this._contactNo;
    }

    set contactNo(value) {
        this._contactNo = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get vehicleList() {
        return this._vehicleList;
    }

    set vehicleList(value) {
        this._vehicleList = value;
    }

    get fieldList() {
        return this._fieldList;
    }

    set fieldList(value) {
        this._fieldList = value;
    }
    constructor(memberCode,firstName,lastName,joinedDate,dateOfBirth,gender,designation,addressLine1,addressLine2,addressLine3,addressLine4,addressLine5,contactNo,email,role,vehicleList,fieldList) {

        this._memberCode = memberCode;
        this._firstName = firstName;
        this._lastName = lastName;
        this._joinedDate = joinedDate;
        this._dateOfBirth = dateOfBirth;
        this._gender = gender;
        this._designation = designation;
        this._addressLine1 = addressLine1;
        this._addressLine2 = addressLine2;
        this._addressLine3 = addressLine3;
        this._addressLine4 = addressLine4;
        this._addressLine5 = addressLine5;
        this._contactNo = contactNo;
        this._email = email;
        this._role = role;
        this._vehicleList = vehicleList;
        this._fieldList = fieldList;
    }
}