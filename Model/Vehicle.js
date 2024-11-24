export default class Vehicle{
    constructor(vehicleCode,licensePlateNumber,vehicleName,category,fuelType,status,staffMember,remark) {
        this._vehicleCode = vehicleCode;
        this._licensePlateNumber = licensePlateNumber;
        this._vehicleName = vehicleName;
        this._category = category;
        this._fuelType = fuelType;
        this._status = status;
        this._staffMember = staffMember;
        this._remark = remark;
    }

    get vehicleCode() {
        return this._vehicleCode;
    }

    set vehicleCode(value) {
        return this._vehicleCode = value;
    }

    get licensePlateNumber() {
        return this._licensePlateNumber;
    }

    set licensePlateNumber(value) {
        this._licensePlateNumber = value;
    }

    get vehicleName() {
        return this._vehicleName;
    }

    set vehicleName(value) {
        this._vehicleName = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get fuelType() {
        return this._fuelType;
    }

    set fuelType(value) {
        this._fuelType = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get staffMember() {
        return this._staffMember;
    }

    set staffMember(value) {
        this._staffMember = value;
    }

    get remark() {
        return this._remark;
    }

    set remark(value) {
        this._remark = value;
    }
}