import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from "jsonwebtoken";

//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name need to be filled']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email should be filled'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [6, 'Password should be greater than six characters'],
        select: true,
    },
    location: {
        type: String,
        default: "INDIA",
    },
    phone: {
        type: String,
        minlength: [10, 'Enter correct mobile number']
    },
}, { timestamps: true }
);

//middlewares
userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
});

//compare
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
};

//JWT
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export default mongoose.model("User", userSchema);