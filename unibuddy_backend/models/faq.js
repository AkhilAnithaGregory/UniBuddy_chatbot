import { Schema as _Schema, model, } from "mongoose";

const Schema = new _Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
})

export default model("FAQ", Schema);