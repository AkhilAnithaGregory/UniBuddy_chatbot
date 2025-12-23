import { DateTime } from 'luxon';
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import getUserIdFromToken from "../services/getUserIdFromToken.js";
import bcrypt from "bcrypt";
import hashPassword from "../middleware/hashingPassword.js";
import DailyCheckIn from '../models/DailyCheckIn.js';

export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) { return res.status(401).json({ message: "Invalid email" }); }

        /* const isPasswordMatch = await bcrypt.compare(password, user.password); */
        const isPasswordMatch = password === user.password;
        if (!isPasswordMatch) { return res.status(401).json({ message: "Wrong password" }); }

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ message: "Successfully logged in", userName: user.name, token });
    } catch (error) { console.error(error); return res.status(500).json({ message: "Server Error" }); }
}

export async function CheckIn(req, res) {
    try {
        const id = getUserIdFromToken(req);
        const user = await User.findById(id);
        if (!user) { return res.status(404).json({ message: "User not found" }); }
        const zone = user.timezone || "UTC";
        const nowUTC = DateTime.utc();
        const todayUser = nowUTC.setZone(zone).startOf("day");
        let checkedInToday = false;
        if (user.lastCheckInUTC) {
            const lastUserDay = DateTime.fromISO(user.lastCheckInUTC, { zone: "utc" }).setZone(zone).startOf("day");
            const dayDiff = todayUser.diff(lastUserDay, "days").days;
            if (dayDiff === 0) { checkedInToday = true; }
            else if (dayDiff === 1) { user.streak += 1; }
            else { user.streak = 1; }
        }
        else { user.streak = 1; }
        if (!checkedInToday) {
            await DailyCheckIn.create({ userId: user._id, checkInUTC: nowUTC.toJSDate() });
            user.lastCheckInUTC = nowUTC.toISO();
            user.longestStreak = Math.max(user.longestStreak || 0, user.streak);
            await user.save(); checkedInToday = true;
        }
        return res.status(200).json(
            {
                message: checkedInToday ? "Checked in successfully" : "Already checked in today",
                streak: user.streak,
                longestStreak: user.longestStreak,
                checkedInToday
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function GetCurrentCheckIn(req, res) {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    const zone = user.timezone || "UTC";
    const nowUser = DateTime.utc().setZone(zone);
    const start = nowUser.startOf("month").toUTC();
    const end = nowUser.endOf("month").toUTC();
    const checkIns = await DailyCheckIn.find({ userId: user.id, checkInUTC: { $gte: start.toJSDate(), $lte: end.toJSDate() } });
    const days = [...new Set(checkIns.map(ci => DateTime.fromJSDate(ci.checkInUTC, { zone: "utc" }).setZone(zone).day))].sort((a, b) => a - b);
    res.json({ month: nowUser.toFormat("yyyy-MM"), days });
}


export async function createUser(req, res) {
    const { name, email, gender, password } = req.body;
    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, gender, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Server error" });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Server error" });
    }
}


export async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const user = await findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export async function updateUser(req, res) {
    const { name, email, gender, role } = req.body;
    const userId = getUserIdFromToken(req);
    try {
        if (email) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: userId }
            });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { name, email, gender, role },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully", user: user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export async function deleteUser(req, res) {
    const userId = getUserIdFromToken(req);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            await User.findByIdAndDelete(userId);
            return res.status(200).json({ message: "User removed successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export async function changePassword(req, res) {
    const { id } = req.params;
    const { currentPassowrd, newPassword } = req.body;
    try {
        const user = await findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isCurrentPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }
        const hashedNewPassword = await hashPassword(newPassword);

        user.password = hashedNewPassword;
        await user.save();
        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({ message: "Password updated successfully", user: userObj });
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}