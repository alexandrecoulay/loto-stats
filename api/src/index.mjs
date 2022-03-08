import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dayjs from "dayjs";

import "./db.mjs"
import drawSchema from "./schema/draws.mjs";
import numberSchema from "./schema/numbers.mjs";

const { urlencoded, json } = bodyParser;
const app = express();

app.use(json({ limit: "400mb" }));
app.use(urlencoded({ limit: "400mb", extended: true }));
app.use(cors());

app.get("/api/draws", async (req, res) => {

    const finding = await drawSchema.find({}).sort({ created_at: -1 });

    return res.status(200).send(finding);
})

app.post("/api/add", async (req, res) => {

    const { first, seconde, third, fourth, fifth, lucky, created_at } = req.body

    const schema = new drawSchema({
        first: first, 
        seconde: seconde, 
        third: third,
        fourth: fourth,
        fifth: fifth,
        lucky: lucky,
        created_at: dayjs(created_at).format()
    })

    await schema.save();

    const fields = [
        "first",
        "seconde",
        "third",
        "fourth",
        "fifth",
        "lucky"
    ]

    await Promise.all(fields.map(async (f) => {
        await numberSchema.findOneAndUpdate({ number: schema[f] }, { $inc: { draw: 1 }})
    }))
    
    return res.status(200).send(schema);
})

app.get("/api/group", async (req, res) => {

    const first = await drawSchema.aggregate([{ '$group': { '_id': '$first', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const seconde = await drawSchema.aggregate([{ '$group': { '_id': '$seconde', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const third = await drawSchema.aggregate([{ '$group': { '_id': '$third', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const fourth = await drawSchema.aggregate([{ '$group': { '_id': '$fourth', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const fifth = await drawSchema.aggregate([{ '$group': { '_id': '$fifth', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const lucky = await drawSchema.aggregate([{'$match': { 'created_at': { '$gte': new Date('Sat, 04 Oct 2008 00:00:00 GMT')}}}, { '$group': { '_id': '$lucky', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);

    res.status(200).json({
        first: first, 
        seconde: seconde, 
        third: third,
        fourth: fourth,
        fifth: fifth,
        lucky: lucky,
    })

})

app.get("/api/numbers", async (req, res) => {

    const finding = await numberSchema.find({}, 'number draw');

    res.status(200).json(finding);

})

app.listen(4000, () => {
    console.log(`🛥️  running on port 4000 🛥️`);
});
  