const userTable = require('../model/usermodel');

exports.getUser = async (req, res) => {
    try {
        const user = await userTable.find();
        res.json(user);

    } catch (error) {
        res.status(400).send('Unable To fetch User');
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await userTable.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400).send("User not Found");
    }
}

exports.postUser = async (req, res) => {
    const { name, email, phoneNumber, password, gender } = req.body;

    try {
        const user = new userTable({ name, email, password, phoneNumber, gender });
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(400).send("Unbale to Post User");
    }
}

exports.putUser = async (req, res) => {
    const { name, email, phoneNumber, password, gender } = req.body;
    try {
        const user = await userTable.findById(req.params.id);
        user.name = name;
        user.email = email;
        user.password = password;
        user.phoneNumber = phoneNumber;
        user.gender = gender;

        await user.save();
        res.json(user);

    } catch (error) {
        res.status(400).send("unbale to update user");
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await userTable.findById(req.params.id);

        await user.deleteOne();
        res.status(200).json({
            message: "User deleted Succesfull"
        });

    } catch (error) {
        res.status(400).send("Unable To Delete user");
    }
}