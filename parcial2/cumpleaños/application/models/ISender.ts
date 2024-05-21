export interface ISender<T> 
{
    sendMessage(data: T): boolean;
}