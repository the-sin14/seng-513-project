import item from "../models/User.ts";
import path from "path";
import asyncWrapper from "../middleware/asyncWrapper.ts";

const getItems = async (req,res) => {
    try {
        const items = await item.find();
        res.status(200).json({items});
    } catch (error) {
        console.log(error);
    }
};

const addItem = asyncWrapper(async (req, res) => {
    const {name} = req.body;
    const file = req.file.path;
    const item = await item.create({name, file});
    res.status(201).json({item});
});

const downloadFile = asyncWrapper(async(req, res) => {
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