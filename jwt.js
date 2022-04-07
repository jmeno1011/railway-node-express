const jwt = require("jsonwebtoken");

// process.env.ACCESS_TOKEN_SECRET을 secretOrPrivateKey으로 사용
exports.generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
};

// process.env.REFRESH_TOKEN_SECRET을 secretOrPrivateKey으로 사용
exports.generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "180 days", });
};

// access token의 유효성 검사
exports.authenticateAccessToken = (req, res, next) => {
    let header = '';
    header = req.headers["authorization"];
    let token = header.split("::")[1];

    if (!token) {
        console.log("wrong token format or token is not sended");
        return res.sendStatus(400);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            console.log(error);
            return res.sendStatus(403);
        }
        
        req.user = user;
        next();
    });
};