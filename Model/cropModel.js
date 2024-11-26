export default class crop {
    get cropCode() {
        return this._cropCode;
    }

    set cropCode(value) {
        this._cropCode = value;
    }

    get cropName() {
        return this._cropName;
    }

    set cropName(value) {
        this._cropName = value;
    }

    get scientificName() {
        return this._scientificName;
    }

    set scientificName(value) {
        this._scientificName = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get season() {
        return this._season;
    }

    set season(value) {
        this._season = value;
    }

    get cropImage() {
        return this._cropImage;
    }

    set cropImage(value) {
        this._cropImage = value;
    }

    get logList() {
        return this._logList;
    }

    set logList(value) {
        this._logList = value;
    }

    get FieldList() {
        return this._FieldList;
    }

    set FieldList(value) {
        this._FieldList = value;
    }
    constructor(cropCode, cropName,scientificName,category,season,cropImage,logList,FieldList) {

        this._cropCode = cropCode;
        this._cropName = cropName;
        this._scientificName = scientificName;
        this._category = category;
        this._season = season;
        this._cropImage = cropImage;
        this._logList = logList;
        this._FieldList = FieldList;
    }
}