export interface IEventRequest {
    type: string,
    destination?: string,
    origin?: string,
    amount: number
}