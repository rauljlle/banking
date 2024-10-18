import { Response } from "express";

export class HttpError extends Error{

    #statusCode: number;
    #message: string;

    constructor(message?: string, statusCode?: number){
        super()
        this.#statusCode = statusCode || 404
        this.#message = message || '0'
    }

    static #handleHttpError(err: HttpError, res: Response){
        res.status(err.#statusCode).send(err.#message);
    }

    static handle(err:unknown ,res: Response){
        const httpErr = err instanceof HttpError ? err : new HttpError

        HttpError.#handleHttpError(httpErr, res);
    }
}