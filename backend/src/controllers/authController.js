const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Organization = require("../models/Organization");

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            organizationName,
            organizationType
        } = req.body;

        // validating required fields

        if (
            !name ||
            !email ||
            !password ||
            !organizationName ||
            !organizationType
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check whether user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create organization
        const organization = await Organization.create({
            name: organizationName,
            organizationType
        });

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "ADMIN",
            organization: organization._id
        });

        // Generate JWT
        const token = jwt.sign(
            {
                userId: user._id,
                organizationId: organization._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Send response
        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationId: organization._id
            }
        });
    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error during registration"
        });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Comapare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                userId: user._id,
                organizationId: user.organization,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationId: user.organization
            }
        });
    } catch (error) {
        console.log("Login error:", error);

        res.status(500).json({
            message: "Server error during login"
        });
    }
};



module.exports = {
    register,
    login
}