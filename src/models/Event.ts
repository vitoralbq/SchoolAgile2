export class Event {
    id?: number;
    name: string = "";
    location: string = "";
    maxNumberOfParticipants: number = 0;
    hoursOfDuration:number = 0;
    typeOfEvent: string = "";//livre, acadêmico, celebração
    eventHost:string[] = [];//usar class EventHost
    guests: string[] = []; 

    /*emitCertificate(typeOfEvent: string, guests:string[], hoursOfDuration: number, eventName: string){
        if(typeOfEvent = "livre" || "acadêmico"){
        forEach(guests.id =>
            console.log `Certifico participação de ${hoursOfDuration} no evento ${typeOfEvent} ${eventName}`)
        } else {
            console.log("este evento não gera certificado de participação");
        };
    }*/

};