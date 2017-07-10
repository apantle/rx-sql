import { createConnection, IConnection, IQuery, IConnectionConfig } from "mysql";
import { Observable, Observer } from "rxjs";

export class RxSQL {
    public connection: IConnection;
    constructor(connectionParam: IConnection) {
        this.connection =  connectionParam;      
    }

    public query(query: string): Observable<Array<any>>{
        return Observable.create((observer: Observer<any>) => {
                this.connection.query(query,(error, result, fields) => {
                        if(error)
                            observer.error(error)
                        observer.next(result)
                })
        })
    }

    public destroyConnection(){
        this.connection.destroy();
    }
}