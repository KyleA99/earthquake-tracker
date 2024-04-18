import mongoose from 'mongoose';

const earthquakeSchema = new mongoose.Schema({
    magnitude: Number,
    location: String,
    time: Date,
    coordinates: { type: { type: String, default: "Point" },
        coordinates: { type: [Number], required: true }
    },
});

// Create a Mongoose model based on the schema
const EarthquakeModel = mongoose.model('Earthquake', earthquakeSchema);

export default EarthquakeModel;
