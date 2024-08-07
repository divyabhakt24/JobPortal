
const errorMiddleware = (err, req, res, nex) => {
    console.log(err);
    const defaultErrors = {
        statusCode: 500,
        mesage: err,
    }

    //missing
    if (err.name === 'ValidationError') {
        defaultErrors.statusCode = 400
        defaultErrors.mesage = Object.values(err.errors).map(item => item.mesage).join(',')
    }


    //duplicate
    if (err.code && err.code === 11000) {
        defaultErrors.statusCode = 400;
        defaultErrors.mesage = `${Object.keys(
            err.keyValue
        )
            } field has to be unique`;
    }
    res.status(defaultErrors.statusCode).json({ message: defaultErrors.mesage });
};

export default errorMiddleware;