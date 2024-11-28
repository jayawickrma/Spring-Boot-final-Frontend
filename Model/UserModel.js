export default  class {
    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }
    constructor(email,password,role) {

        this._email = email;
        this._password = password;
        this._role = role;
    }
}