import express, { Request, Response } from 'express';
import accountService from './service'
import appService from './service';
import { HttpError } from '../errors/HttpError';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    try {
        res.send(appService.getRoot());
    } catch (error) {
        HttpError.handle(error, res)
    }
});

router.get('/balance', async (req: Request, res: Response) => {
    try {
        const accountId = req.query.account_id as string;
        const balance = accountService.balanceHandler(accountId);
        
        res.status(200).send(balance.toString());
    } catch (error) {
        HttpError.handle(error, res)
    }
});

router.post('/event', async (req: Request, res: Response) => {
    try {
        const eventResponse = accountService.eventHandler(req.body);
        res.status(201).json(eventResponse);
    } catch (error) {
        HttpError.handle(error, res)
    }
});

router.post('/reset', async (req: Request, res: Response) => {
    try {
        appService.postReset();
        res.sendStatus(200);
    } catch (error) {
        HttpError.handle(error, res)
    }
});

export default router;
