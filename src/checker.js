const empty = (obj) => {
    const empty = Object.getOwnPropertyNames(obj).length === 0? true: false;
    if (empty) throw "emptyData";
}

const mailCheck = (value) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(value)) throw "wrongData";
}

/*To check a password between 6 to 20 
characters which contain at least one 
numeric digit, one uppercase and one lowercase letter*/
const passwordCheck = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!regex.test(value)) throw "wrongData";
}

/*Valid a phone number like XXX-XXX-XXXX */
const phoneCheck = (value) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(!regex.test(value)) throw "wrongData";
}

/*Username must have alphabet characters only*/
const fullNameCheck = (value) => {
    const regex = /^[A-Za-z]+$/;
    if(!regex.test(value)) throw "wrongData";
}

const singUp = (obj) => {
    empty(obj);
    const {user, fullName, email, phone, address, password} = obj;
    if (!user || !fullName || !email || !phone || !address || !password) throw "wrongData";
    
    mailCheck(email)
    passwordCheck(password);
    phoneCheck(phone);
    fullNameCheck(fullName);
}

module.exports = { singUp, passwordCheck, mailCheck }