const {USER_TYPES} = require('../consts/system-consts');
const User = require('../models/users/userModel');
const Customer = require('../models/users/customerModel')

const createNewCustomer = async (req, res) => {
    try{
        if (req.body.password !== req.body.confirmPassword) {
            res.status(400).send('Password not equal the confirmation')
        }
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            type: USER_TYPES.CUSTOMER
        };
    
        const newCustomer = {
            businessName: req.body.businessName,
            secondaryPhone: req.body.secondaryPhone
        };
    
        const user = await User.create(newUser);
        await Customer.create({id: user.id, ...newCustomer});
        res.status(201).send('User created successfully')
    } catch (e) {
        console.log(e)
        res.status(400).send('invalid parameters')
    }
}

module.exports = {
    createNewCustomer
}