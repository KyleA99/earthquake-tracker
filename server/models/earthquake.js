import mongoose from "mongoose";

const EarthquakeSchema = new mongoose.Schema({
    magnitude: Number,
    location: String,
    time: Date,
    coordinates: [Number]
});

// Create a Mongoose model based on the schema
const Earthquake = mongoose.model('Earthquake', EarthquakeSchema);

export default Earthquake;
