const mongoose = require("mongoose");

const validName = function (name) {
    const nameRegex = /^[a-zA-Z ]*$/
    return nameRegex.test(name)
}

const validPhone = function (mobile) {
    const mobileRegex = /^[6789]\d{9}$/
    return mobileRegex.test(mobile)
}

const validEmail = function (email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-][a-z]{1,4}$/
    return emailRegex.test(email)
}



const validPincode = function (data) {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(data);
}

const validPassword = function (password) {
    const passwordRegex = /^(?=.*?[#?!@$%^&*-]).{5,15}$/
    return passwordRegex.test(password)
}




module.exports = { validName, validPhone, validEmail, validPincode, validPassword}