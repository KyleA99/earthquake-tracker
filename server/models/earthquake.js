import mongoose from "mongoose";

const EarthquakeSchema = new mongoose.Schema({
    magnitude: Number,
    location: String,
    time: Date,
    coordinates: [Number]
});

module.exports = mongoose.model('Earthquake', EarthquakeSchema);