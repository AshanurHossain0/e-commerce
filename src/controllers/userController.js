const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { validEmail, validName, validPassword, validPhone, validPincode } = require("../validator/validator");

const register = async function (req, res) {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide data" });

        let { fullName, email, phone, password, address } = data;

        if (!fullName) return res.status(400).send({ status: false, message: "Full Name is mandatory" })
        if (!email) return res.status(400).send({ status: false, message: "Email is mandatory" })
        if (!phone) return res.status(400).send({ status: false, message: "Phone is mandatory" })
        if (!password) return res.status(400).send({ status: false, message: "Password is mandatory" })
        if (!address) return res.status(400).send({ status: false, message: "Address is mandatory" })


        if (!validName(fullName.trim())) return res.status(400).send({ status: false, message: "Invalid Full Name" })

        if (!validEmail(email)) return res.status(400).send({ status: false, message: "Please provide valid email" })
        let findEmail = await userModel.findOne({ email })
        if (findEmail) return res.status(400).send({ status: false, message: "User with this email already exists" })

        if (!validPhone(phone)) return res.status(400).send({ status: false, message: "Please provide correct phone number" })
        let findPhone = await userModel.findOne({ phone });
        if (findPhone) return res.status(400).send({ status: false, message: "User with this phone number already exists" })

        if (!validPassword(password)) return res.status(400).send({ status: false, message: "Password length should be min 5 and max 15, atleast a special character" })


        //Hashing
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds)

        if (!address) return res.status(400).send({ status: false, message: "Address is mandatory" })

        if (!address.street) return res.status(400).send({ status: false, message: "Street is mandatory" })
        if (!address.city) return res.status(400).send({ status: false, message: "City is mandatory" })
        if (!address.landmark) return res.status(400).send({ status: false, message: "Landmark is mandatory" })
        if (!address.pincode) return res.status(400).send({ status: false, message: "Pincode is mandatory" })
        if (!validPincode(address.pincode)) return res.status(400).send({ status: false, message: "Please provide valid pincode" })

        const userData = {
            fullName, email,
            phone, password: hash, address
        }

        const user = await userModel.create(userData);
        return res.status(201).send({ status: true, message: "User created successfully", data: user });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const login = async function (req, res) {
    try {
        let { email, password } = req.body;

        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ status: false, message: "Please provide mandatory fields" });
        }

        if (!email) {
            return res.status(400).send({ status: false, message: "Email is mandatory" });
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "Password is mandatory" });
        }

        let verifyUser = await userModel.findOne({ email});
        if (!verifyUser) return res.status(400).send({ status: false, message: "No account exists with this email" });

        const isCorrectPassword = bcrypt.compareSync(password, verifyUser.password)
        if (!isCorrectPassword) return res.status(400).send({ status: false, message: "Incorrect password" })


        let payload = {
            exp: Math.floor(Date.now() / 1000) + 30*24*3600,
            iat: Date.now(), userId: verifyUser["_id"],
        };


        let token = jwt.sign(payload, "e-commerce2");

        res.status(200).send({ status: true, message: "Login successfull", data: { userId: verifyUser["_id"], token } });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getOrderHistory = async function (req, res) {
    try {
        const userId=req.token.userId;

        //get order history
        const orderHistory = await userModel.findById(userId).populate('orders').select('orders -_id');

        return res.status(200).send({status:true,data:orderHistory.orders})
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { register, login,getOrderHistory }