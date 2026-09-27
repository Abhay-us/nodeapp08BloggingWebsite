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
    const { name, email, phoneNumber, gender } = req.body;
    try {
        const user = await userTable.findById(req.params.id);
        user.name = name;
        user.email = email;
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

exports.getUserByEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userTable.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "Email not registered"
            });
        }
        res.status(200).json({
            message: "Email verified"
        });
    } catch (error) {
        res.status(400).send("unable to Fetch Email")
    }
}

exports.updatePassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    try {
        if (!password || !confirmPassword) {
            res.status(400).send("Password and Confirm Password Required");
        }
        if (password !== confirmPassword) {
            return res.status(404).send("Password Not Match")
        }

        const user = await userTable.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send("User Not found");
        }
        user.password = password;
        user.updatedAt = new Date();

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send("Error: Password did not Update!");
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).send("Email & Password is required");
        }

        const user = await userTable.findOne({
            email: email.trim().toLowerCase(),
            password: password
        });
        if (!user) {
            return res.status(401).send("No user found");
        }
        if (user.password !== password) {
            return res.status(401).send("Invalid Password");
        }
        return res.status(200).json({
            message: "Login Successfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Login Failed"
        })
    }
}