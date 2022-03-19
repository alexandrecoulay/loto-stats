import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dayjs from "dayjs";
import drawSchema from "./schema/draws.mjs";
import numberSchema from "./schema/numbers.mjs";
import fs from "fs";

import "./db.mjs"

const { urlencoded, json } = bodyParser;
const app = express();

app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const ArrayAvg = (myArray) => {
    let i = 0;
    let summ = 0; 
    let ArrayLen = myArray.length;
    while (i < ArrayLen) {
        summ = summ + myArray[i++];
    }
    return summ / ArrayLen;
}

const ArrayTotal = (myArray) => {
    let i = 0;

    for (let index = 0; index < myArray.length; index++) {
        i = i + myArray[index].total;
    }

    return i;
}

// Add a draw

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
        "fifth"
    ]

    await Promise.all(fields.map(async (f) => {
        await numberSchema.findOneAndUpdate({ number: schema[f] }, { $inc: { draw: 1 }})
    }))
    
    return res.status(200).send(schema);
})

// Get all draws

app.get("/api/draws", async (req, res) => {

    const finding = await drawSchema.find({}).sort({ created_at: -1 });

    return res.status(200).send(finding);
})


// Sort number by draw place

app.get("/api/group", async (req, res) => {

    const first = await drawSchema.aggregate([{ '$group': { '_id': '$first', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const seconde = await drawSchema.aggregate([{ '$group': { '_id': '$seconde', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const third = await drawSchema.aggregate([{ '$group': { '_id': '$third', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const fourth = await drawSchema.aggregate([{ '$group': { '_id': '$fourth', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const fifth = await drawSchema.aggregate([{ '$group': { '_id': '$fifth', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const lucky = await drawSchema.aggregate([{ '$group': { '_id': '$lucky', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);

    res.status(200).json({
        total: {
            first: ArrayTotal(first),
            seconde: ArrayTotal(seconde),
            third: ArrayTotal(third),
            fourth: ArrayTotal(fourth),
            fifth: ArrayTotal(fifth),
            lucky: ArrayTotal(lucky),
        },
        first: first, 
        seconde: seconde, 
        third: third,
        fourth: fourth,
        fifth: fifth,
        lucky: lucky,
    })

})


// Average number 

app.get("/api/average", async (req, res) => {

    const finding = await numberSchema.find({}, 'number draw');

    const average = ArrayAvg(finding.map((n) => {
        return n.draw
    }))
    
    const to_return = finding.map(n => ({ number: n.number, difference: n.draw-average })).sort((a, b) => a.difference - b.difference)

    res.status(200).json(to_return);
})

// Get the repartition

app.get("/api/numbers", async (req, res) => {

    const finding = await numberSchema.find({}, 'number draw');

    res.status(200).json(finding);
})

app.get("/api/create", async (req, res) => {
    const first = await drawSchema.aggregate([{ '$group': { '_id': '$first', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const seconde = await drawSchema.aggregate([{ '$group': { '_id': '$seconde', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const third = await drawSchema.aggregate([{ '$group': { '_id': '$third', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const fourth = await drawSchema.aggregate([{ '$group': { '_id': '$fourth', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const fifth = await drawSchema.aggregate([{ '$group': { '_id': '$fifth', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);
    const lucky = await drawSchema.aggregate([{ '$group': { '_id': '$lucky', 'total': { '$sum': 1 }}}, { '$sort': { '_id': 1 }}]);

    const best = await numberSchema.find({}).sort({ draw: -1 });

    const average = {
        first: ArrayAvg(first.map(f => f.total)),
        seconde: ArrayAvg(seconde.map(f => f.total)),
        third: ArrayAvg(third.map(f => f.total)),
        fourth: ArrayAvg(fourth.map(f => f.total)),
        fifth: ArrayAvg(fifth.map(f => f.total)),
        lucky: ArrayAvg(lucky.map(f => f.total))
    };

    const max_draws_numbers = {
        first: first.filter(f => f.total > average.first).sort((a, b) => b.total - a.total),
        seconde: seconde.filter(f => f.total > average.seconde).sort((a, b) => b.total - a.total),
        third: third.filter(f => f.total > average.third).sort((a, b) => b.total - a.total),
        fourth: fourth.filter(f => f.total > average.fourth).sort((a, b) => b.total - a.total),
        fifth: fifth.filter(f => f.total > average.fifth).sort((a, b) => b.total - a.total),
        lucky: lucky.filter(f => f.total > average.lucky).sort((a, b) => b.total - a.total)
    }

    const min_draws_numbers = {
        first: first.filter(f => f.total < average.first).sort((a, b) => a.total - b.total),
        seconde: seconde.filter(f => f.total < average.seconde).sort((a, b) => a.total - b.total),
        third: third.filter(f => f.total < average.third).sort((a, b) => a.total - b.total),
        fourth: fourth.filter(f => f.total < average.fourth).sort((a, b) => a.total - b.total),
        fifth: fifth.filter(f => f.total < average.fifth).sort((a, b) => a.total - b.total),
        lucky: lucky.filter(f => f.total < average.lucky).sort((a, b) => a.total - b.total)
    }

    const best_draws_numbers = {
        first: best[0]["number"],
        seconde: best[1]["number"],
        third: best[2]["number"],
        fourth: best[3]["number"],
        fifth: best[4]["number"],
        lucky: lucky.filter(f => f.total > average.lucky).sort((a, b) => b.total - a.total)[0]["_id"]
    }

    res.status(200).json({
        max_draws: max_draws_numbers,
        min_draws: min_draws_numbers,
        best_draws: best_draws_numbers
    });
})

// init draws

app.get("/api/draws/init", async (req, res) => {
    const draws = JSON.parse(fs.readFileSync("./src/csvjson.json", "utf-8"));

    draws.forEach((element) => {
        
        const date = element.date_de_tirage.split("/");

        const schema = new drawSchema({
            first: element.boule_1, 
            seconde: element.boule_2, 
            third: element.boule_3,
            fourth: element.boule_4,
            fifth: element.boule_5,
            lucky: element.numero_chance,
            created_at: dayjs(`${date[1]}-${date[0]}-${date[2]}`).set("h", 20).set('minutes', 30).format()
        })
        schema.save();
    });

    res.sendStatus(200)
})

// init repartition 

app.get("/api/numbers/init", async (req, res) => {
    for (let index = 1; index < 50; index++) {
        const schema = new numberSchema({
            number: index,
            draw: 0,
        })

        await schema.save()
        
    }
    res.sendStatus(200)

})

app.get("/api/numbers/group", async (req, res) => {

    const finding = await drawSchema.find({}).sort({ created_at: -1 });
    
    await Promise.all(finding.map(async schema => {
        const fields = [
            "first",
            "seconde",
            "third",
            "fourth",
            "fifth"
        ]
        
        await Promise.all(fields.map(async (f) => {
            await numberSchema.findOneAndUpdate({ number: schema[f] }, { $inc: { draw: 1 }})
        }))
    }))

    res.sendStatus(200)
})

app.listen(4000, () => {
    console.log(`🛥️  running on port 4000 🛥️`);
});
  