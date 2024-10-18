import { Account } from "./model";

export class DB {

    private data: Account[];
    static #instance: DB;

    private constructor(){
        this.data = [];
    }

    insert(account: Account){
        this.data.push(account)
    }
 
    findById(id: string): Account | undefined {
        return this.data.find(account => account.getId() === id);
    }

    reset(){
        this.data = []
    }


    //Implements singleton pattern
    public static get instance(): DB {
        if (!DB.#instance) {
            DB.#instance = new DB();
        }
        return DB.#instance;
    }

}