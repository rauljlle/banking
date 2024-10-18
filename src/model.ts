import { IAccount } from "./interfaces/account-info";
export class Account {

    #id: string;
    #balance: number;

    constructor(id: string, balance: number){
        this.#id = id;
        this.#balance = balance;
    }

    addBalance(amount: number){
        this.#balance += amount;
    }

    removeBalance(amount: number){
        this.#balance -= amount;
    }

    DTO(): IAccount{
        return {
            id: this.#id,
            balance: this.#balance
        }
    }

    getId(): string {
        return this.#id;
    }

    getBalance(): number {
        return this.#balance;
    }

}