export const userValidation = {
    name: {
        required: "Name is required",
        minLength: {
            value: 3,
            message: "Name must be at least 3 characters"
        },
        pattern: {
            value: /^[A-Za-z ]+$/,
            message: "Name can contain only letters"
        }
    },

    email: {
        required: {
            value: true,
            message: "Email is Required",
        },
        maxLength: {
            value: 30,
            message: "Email must not be above 30 letters",
        },
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid email address",
        },
    },
    password: {
        required: {
            value: true,
            message: "Password is required"
        },
        // minLength: {
        //     value: 8,
        //     message: "Password must be at least 8 characters"
        // },
        // maxLength: {
        //     value: 20,
        //     message: "Password must not exceed 20 characters"
        // },
        // pattern: {
        //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        //     message: "Password must contain uppercase, lowercase, number and special character"
        // }
    },

    phoneNumber: {
        required: {
            value: true,
            message: "phone number is required",
        },
        maxLength: {
            value: 10,
            message: "Phone Number in not Excced 10 digits.",
        },
        pattern: {
            value: /^\d{10}$/,
            message: "Invalid Number Please Enter Valid Number",
        },
    },

    gender: {
        required: "Gender is required"
    },      
};