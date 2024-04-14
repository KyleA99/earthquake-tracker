import mongoose from 'mongoose';

const earthquakeSchema = new mongoose.Schema({
    magnitude: Number,
    location: String,
    time: Date,
    coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere' // Indexing for geospatial queries
    }
});

// Create a Mongoose model based on the schema
const Earthquake = mongoose.model('Earthquake', earthquakeSchema);

export default Earthquake;
