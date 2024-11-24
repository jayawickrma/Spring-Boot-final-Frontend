export default class Field {
    constructor(code, name, location, size, cropId, staffID, img1, img2) {
        this._code = code;
        this._name = name;
        this._location = location;
        this._size = size;
        this._cropId = cropId;
        this._staffID = staffID;
        this._img1 = img1;
        this._img2 = img2;
    }

    // Getters
    get code() {
        return this._code;
    }

    get name() {
        return this._name;
    }

    get location() {
        return this._location;
    }

    get size() {
        return this._size;
    }

    get cropId() {
        return this._cropId;
    }

    get staffID() {
        return this._staffID;
    }

    get img1() {
        return this._img1;
    }

    get img2() {
        return this._img2;
    }

    // Setters
    set code(value) {
        this._code = value;
    }

    set name(value) {
        this._name = value;
    }

    set location(value) {
        this._location = value;
    }

    set size(value) {
        this._size = value;
    }

    set cropId(value) {
        this._cropId = value;
    }

    set staffID(value) {
        this._staffID = value;
    }

    set img1(value) {
        this._img1 = value;
    }

    set img2(value) {
        this._img2 = value;
    }

    // toString method
    toString() {
        return `Field {
            Code: ${this._code},
            Name: ${this._name},
            Location: ${this._location},
            Size: ${this._size},
            Crop ID: ${this._cropId},
            Staff ID: ${this._staffID},
            Image 1: ${this._img1},
            Image 2: ${this._img2}
        }`;
    }
}
