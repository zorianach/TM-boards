import mongoose from 'mongoose';

const DB_HOST = process.env.DB_HOST;

if (!DB_HOST) {
    console.error("Database connection string is missing");
    process.exit(1);
}

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((error) => {
        console.error("Database connection error", error);
        process.exit(1);
    });
