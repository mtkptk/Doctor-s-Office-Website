import { Pregled } from "./pregled";

export class User{
    //common fields
    _id: string;        //PK
    type: string;
    username: string;
    password: string;
    name: string;
    last_name: string;
    address: string;
    phone: string;
    email: string;
    //lekar specific
    licence: string;
    spec: string;       //FK
    ogranak: string;
    pregledi: String[] = []; //ID pregleda FK
    image_path: string;
    zauzetost: Zauzetost[] = []; //ID Zauzetosti FK
}

export class Zauzetost{
    //_id: string;
    start: number;
    duration: number;
    pregled: boolean;
    //lekar_id: string;
}