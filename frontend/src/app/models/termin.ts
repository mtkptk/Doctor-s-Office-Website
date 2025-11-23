import { Pregled } from "./pregled";

export class Termin{
    _id: string;
    start: number;
    duration: number;
    lekar_id: string;
    pacijent_id: string;
    pregled: Pregled;
    izvestaj: boolean;
}