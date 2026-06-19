const auth = (req, res, next) => {

    const apiKey = req.headers["api-key"];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: "API Key Missing"
        });
    }

    if (apiKey !== "12345") {
        return res.status(403).json({
            success: false,
            message: "Invalid API Key"
        });
    }

    next();
};

module.exports = auth;
