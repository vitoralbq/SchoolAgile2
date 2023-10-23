import pino from "pino";

const logger = pino(
    pino.destination("./pino-logger.log")
);

export {logger as log};