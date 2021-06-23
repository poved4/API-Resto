const errBadReuest = require("./appError").badRequest;

empty = (obj) => {
    const empty = Object.getOwnPropertyNames(obj).length === 0? true: false;
    if (empty) throw new errBadReuest("empty Data");
}

mailCheck = (value) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(value)) throw new errBadReuest("invalid email");
}

/*To check a password between 6 to 20 
characters which contain at least one 
numeric digit, one uppercase and one lowercase letter*/
passwordCheck = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!regex.test(value)) throw new errBadReuest("Invalid password");
}

/*Valid a phone number like XXX-XXX-XXXX */
numberCheck = (value) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(!regex.test(value)) throw new errBadReuest("only numbers");
}

/*Username must have alphabet characters only*/
letterCheck = (value) => {
    const regex = /^[A-Za-z]+$/;
    if(!regex.test(value)) throw new errBadReuest("only letters");
}

exports.mailCheck = (value) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(value)) throw new errBadReuest("invalid email");
}

exports.singUp = (obj) => {
    empty(obj);
    const {user, fullName, email, phone, address, password} = obj;
    if (!user || !fullName || !email || !phone || !address || !password) throw new errBadReuest("missing data");
    
    mailCheck(email)
    passwordCheck(password);
    numberCheck(phone);
    letterCheck(fullName);
}
//revisar
exports.newProduct = ({price, name, link_img}) => {
    empty({price, name, link_img});
    if (!price || !name || !link_img) throw new errBadReuest("missing data");
    // letterCheck(name); numberCheck(price);
}