import { IAccount } from './interfaces/account-info';
import { IEventRequest } from './interfaces/event-request';
import { IEventResponse } from './interfaces/event-response';
import { DB } from './utils/DB';
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

    private deposit(destinationId: string, amount: number): IDeposit{
        let destination = DB.instance.findById(destinationId);

        if (!destination) destination = new Account(destinationId, 0);

        destination.addBalance(amount);

        return {
            destination: destination.DTO()
        }
    }

    private withdraw(originId: string, amount: number): IWithdraw {
        let origin = DB.instance.findById(originId);

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
        const account = DB.instance.findById(id);

        if (!account) throw new Error;

        return account.getBalance();
    }

    getRoot(): string {
        return 'Hire me ;)';
    }

    postReset(): void {
        DB.instance.reset();
    }

}

export default new AccountService();
