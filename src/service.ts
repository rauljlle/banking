import { IAccount } from './interfaces/account-info';
import { IEventRequest } from './interfaces/event-request';
import { IEventResponse } from './interfaces/event-response';
import { DB } from './DB';
import { Account } from './model';

interface IDeposit {
    destination: IAccount;
}

interface IWithdraw {
    origin: IAccount;
}

interface ITransfer {
    destination: IAccount;
    origin: IAccount;
}

class AccountService {

    static #db = DB.instance;

    private getById(id: string): Account | undefined {
        return AccountService.#db.findById(id);
    }

    private deposit(destinationId: string, amount: number): IDeposit{
        let destination = this.getById(destinationId);

        if (!destination) destination = new Account(destinationId, 0);

        destination.addBalance(amount);

        return {
            destination: destination.DTO()
        }
    }

    private withdraw(originId: string, amount: number): IWithdraw {
        let origin = this.getById(originId);

        if (!origin) throw new Error;

        origin.removeBalance(amount);

        return {
            origin: origin.DTO()
        }
    }

    private transfer(originId: string, destinationId: string, amount: number): ITransfer {
        const withdraw = this.withdraw(originId, amount);

        const deposit = this.deposit(destinationId, amount);

        return {
            destination: deposit.destination,
            origin: withdraw.origin
        }

    }

    public eventHandler(reqBody: IEventRequest): IEventResponse {
        switch (reqBody.type) {
            case 'deposit':
                return this.deposit(reqBody.destination!, reqBody.amount);
            case 'withdraw':
                return this.withdraw(reqBody.origin!, reqBody.amount);
            case 'transfer':
                return this.transfer(reqBody.origin!, reqBody.destination!, reqBody.amount);
            default:
                throw new Error;
        }
    }

    public balanceHandler(id: string): number{
        const account = this.getById(id);

        if (!account) throw new Error;

        return account.getBalance();
    }

    getRoot(): string {
        return 'Hire me ;)';
    }

    postReset(): void {
        AccountService.#db.reset();
    }

}

export default new AccountService();
