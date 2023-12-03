const item = require("../models/item");
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper")

const getItems = async (req, req) => {
    try {
        const items = await item.find();
        res.status(200).json({items});
    } catch (error) {
        console.log(error);
    }
};

const addItem = asyncWrapper(async (req, req) => {
    const {name} = req.body;
    const file = req.file.path;
    const item = await item.create({name, file});
    res.status(201).json({item});
});

const downloadFile = asyncWrapper(async(req, req) => {
    const {id} = req.params;
    const item = await Item.findById(id);
    if(!item){
        return next(new Error("No item found"))
    }
    const file = item.file;
    const filePath = path.join(__dirname, '../${file}');
    res.download(filePath);
});

module.exports = {
    getItems,
    addItem,
    downloadFile,
};