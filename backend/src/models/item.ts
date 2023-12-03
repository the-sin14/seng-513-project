const mongoose = require ("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [20, "Name no more then 20 characters"]
    },
    file:{
        type: String,
        required: [true, "Please provide a file"],
    },
});

module.exports = mongoose.model("item", itemSchema);