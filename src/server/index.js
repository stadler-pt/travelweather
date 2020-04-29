let data = []




// Set up server
const path = require("path")
const express = require("express")
const app = express()

// Sensible data in .env
const dotenv = require('dotenv');
dotenv.config();

// Dependencies
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cors = require("cors")
app.use(cors())

// Set main project folder
app.use(express.static("dist"))

// Start server
const PORT = 7000 || process.env.PORT;
const server = app.listen(PORT, ()=>{
    console.log(`running on localhost: ${port}`);
})

// Display main folder
app.get("/", (req, res) => {
  res.send("../../dist/index.html")
})

// Send Api data for calls
app.get("https://tender-ptolemy-4b0ef4.netlify.app/sensible", (req, res) => {
  const geoName = process.env.GEO_NAME
  const geoUrl = process.env.GEO_URL
  const skyKey = process.env.SKY_KEY
  const skyUrl = process.env.SKY_URL
  const pixKey = process.env.PIX_KEY
  const pixUrl = process.env.PIX_URL
  let sensibleData = [geoName, geoUrl, skyKey, skyUrl, pixKey, pixUrl]
  console.log("Server: ")
  console.log(sensibleData)
  res.send(sensibleData)
})

// Create container for search results in data array
app.post("/createNew", (req, res) => {
  data.push([])
  res.send(req.body)
})

// Add data to data array
app.post("/postData", (req, res) => {
  data[data.length - 1].push(req.body)
  res.send(req.body)
})

// Get data from data array
app.get('/getData', (req, res) => {
  res.send(data)
})