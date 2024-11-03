export default class field{
    constructor(code,name,location,size,cropId,staffID,img1,img2) {
                this._code=code;
                this._name=name;
                this._location=location;
                this._size=size;
                this._cropId=cropId;
                this._staffID=staffID;
                this._img1=img1;
                this._img2=img2;
    }


    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value;
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

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get cropId() {
        return this._cropId;
    }

    set cropId(value) {
        this._cropId = value;
    }

    get staffID() {
        return this._staffID;
    }

    set staffID(value) {
        this._staffID = value;
    }

    get img1() {
        return this._img1;
    }

    set img1(value) {
        this._img1 = value;
    }

    get img2() {
        return this._img2;
    }

    set img2(value) {
        this._img2 = value;
    }
}