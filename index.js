import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));
app.set("view engine" , "ejs");

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/joke", async (req,res) => {
    const user = req.body.name;
    const category = req.body.category;

    try {
         const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
    let joke = "";

    if (response.data.type === "single") {
      joke = response.data.joke;
    } else if (response.data.type === "twopart") {
      joke = `${response.data.setup} ... ${response.data.delivery}`;
    }

    res.render("joke", { user, joke });
    } catch (error) {
        res.status(404).send(error.message);
    }

})

app.listen(port, () => {
    console.log(`Listening to server running on port ${port}`);
})