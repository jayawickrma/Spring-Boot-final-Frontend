export default class {
    get vehicleCode() {
        return this._vehicleCode;
    }

    set vehicleCode(value) {
        this._vehicleCode = value;
    }

    get licencePlateNumber() {
        return this._licencePlateNumber;
    }

    set licencePlateNumber(value) {
        this._licencePlateNumber = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
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

    get remark() {
        return this._remark;
    }

    set remark(value) {
        this._remark = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get memberCode() {
        return this._memberCode;
    }

    set memberCode(value) {
        this._memberCode = value;
    }
    constructor(vehicleCode,licencePlateNumber,name,category,fuelType,remark,status,memberCode) {

        this._vehicleCode = vehicleCode;
        this._licencePlateNumber = licencePlateNumber;
        this._name = name;
        this._category = category;
        this._fuelType = fuelType;
        this._remark = remark;
        this._status = status;
        this._memberCode = memberCode;
    }
}