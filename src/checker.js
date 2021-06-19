const password = (value) => {
    //console.log("Hello from checker/password");
    //throw "wrongData";
}

const email = (value) => {
    //throw "wrongData";
}

const singUp = ({email, password}) => {
    email(email);
    password(password);
}

const singIn = ({user, fullName, email, phone, address, password}) => {
    if(!user || !fullName || !email || !phone || !address || !password) throw "wrongData";
}


module.exports = { singUp, singIn, password, email }