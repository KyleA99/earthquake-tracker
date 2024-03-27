import mongoose from 'mongoose';

const earthquakeSchema = new mongoose.Schema({
    magnitude: Number,
    location: String,
    time: Date,
    coordinates: [Number]
});

// Create a Mongoose model based on the schema
const Earthquake = mongoose.model('Earthquake', earthquakeSchema);

export default Earthquake;
