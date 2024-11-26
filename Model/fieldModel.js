import {staffList} from "../db/db";

export default class  {
    get fieldCode() {
        return this._fieldCode;
    }

    set fieldCode(value) {
        this._fieldCode = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    get extentSize() {
        return this._extentSize;
    }

    set extentSize(value) {
        this._extentSize = value;
    }

    get fieldImage1() {
        return this._fieldImage1;
    }

    set fieldImage1(value) {
        this._fieldImage1 = value;
    }

    get fieldImage2() {
        return this._fieldImage2;
    }

    set fieldImage2(value) {
        this._fieldImage2 = value;
    }

    get equipmentsList() {
        return this._equipmentsList;
    }

    set equipmentsList(value) {
        this._equipmentsList = value;
    }

    get staffList() {
        return this._staffList;
    }

    set staffList(value) {
        this._staffList = value;
    }

    get cropsList() {
        return this._cropsList;
    }

    set cropsList(value) {
        this._cropsList = value;
    }

    get logsList() {
        return this._logsList;
    }

    set logsList(value) {
        this._logsList = value;
    }
    constructor(fieldCode,name,location,extentSize,fieldImage1,fieldImage2,equipmentsList,staffList,cropsList,logsList) {

        this._fieldCode = fieldCode;
        this._name = name;
        this._location = location;
        this._extentSize = extentSize;
        this._fieldImage1 = fieldImage1;
        this._fieldImage2 = fieldImage2;
        this._equipmentsList = equipmentsList;
        this._staffList = staffList;
        this._cropsList = cropsList;
        this._logsList = logsList;
    }
}