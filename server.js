const express = require("express");

const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const errorHandler =
require("./middleware/errorHandler");

const app = express();

app.use(express.json());


// Custom Logger Middleware
app.use(logger);


// Home Route
app.get("/", (req, res) => {

    res.json({
        message:
        "Middleware & Error Handling API"
    });
});


// Protected Route
app.get(
    "/dashboard",
    auth,
    (req, res) => {

        res.json({
            success: true,
            message:
            "Welcome to Dashboard"
        });
    }
);


// Error Route
app.get("/error", (req, res, next) => {

    const err = new Error(
        "This is a custom error"
    );

    err.status = 400;

    next(err);
});


// 404 Route Handler
app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});


// Global Error Middleware
app.use(errorHandler);


const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running on Port ${PORT}`
    );
});
