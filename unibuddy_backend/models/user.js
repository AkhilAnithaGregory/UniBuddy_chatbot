import { Schema as _Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const Schema = new _Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male", required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true
    }
});

Schema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

Schema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default model("User", Schema);
