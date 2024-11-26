import {staffList} from "../db/db";

export default class {
    get logCode() {
        return this._logCode;
    }

    set logCode(value) {
        this._logCode = value;
    }

    get logDate() {
        return this._logDate;
    }

    set logDate(value) {
        this._logDate = value;
    }

    get logDetails() {
        return this._logDetails;
    }

    set logDetails(value) {
        this._logDetails = value;
    }

    get observedImage() {
        return this._observedImage;
    }

    set observedImage(value) {
        this._observedImage = value;
    }

    get staffList() {
        return this._staffList;
    }

    set staffList(value) {
        this._staffList = value;
    }

    get cropList() {
        return this._cropList;
    }

    set cropList(value) {
        this._cropList = value;
    }

    get fieldList() {
        return this._fieldList;
    }

    set fieldList(value) {
        this._fieldList = value;
    }
    constructor(logCode,logDate,logDetails,observedImage,staffList,cropList,fieldList) {

        this._logCode = logCode;
        this._logDate = logDate;
        this._logDetails = logDetails;
        this._observedImage = observedImage;
        this._staffList = staffList;
        this._cropList = cropList;
        this._fieldList = fieldList;
    }
}