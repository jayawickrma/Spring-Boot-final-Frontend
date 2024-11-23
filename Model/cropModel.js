export default class Crop {
    constructor(code, name, scientific, season, field, category, image) {
        this._code = code;
        this._name = name;
        this._scientific = scientific;
        this._season = season;
        this._field = field;
        this._category = category;
        this._image = image;
    }

    // Getters
    get code() {
        return this._code;
    }

    get name() {
        return this._name;
    }

    get scientific() {
        return this._scientific;
    }

    get season() {
        return this._season;
    }

    get field() {
        return this._field;
    }

    get category() {
        return this._category;
    }

    get image() {
        return this._image;
    }

    // Setters
    set code(value) {
        this._code = value;
    }

    set name(value) {
        this._name = value;
    }

    set scientific(value) {
        this._scientific = value;
    }

    set season(value) {
        this._season = value;
    }

    set field(value) {
        this._field = value;
    }

    set category(value) {
        this._category = value;
    }

    set image(value) {
        this._image = value;
    }

    // toString method
    toString() {
        return `Crop [code=${this._code}, name=${this._name}, scientific=${this._scientific}, season=${this._season}, field=${this._field}, category=${this._category}, image=${this._image}]`;
    }
}
