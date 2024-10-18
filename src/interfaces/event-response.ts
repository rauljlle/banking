import { IAccount } from "./account-info";

export interface IEventResponse {
    origin?: IAccount,
    destination?: IAccount
}