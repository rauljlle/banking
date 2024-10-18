import { IAccount } from "./interfaces/account-info";
import { DB } from "./utils/DB";

export class Account {

    #id: string;
    #balance: number;
    private db = DB.instance;

    constructor(id: string, balance: number){
        this.#id = id;
        this.#balance = balance;
        this.db.insert(this);
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