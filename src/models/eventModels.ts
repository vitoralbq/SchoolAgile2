import ListOfParticipants from "./Participants";

export class Event {
    eventId?: number;
    eventName: string = "";
    eventLocation: string = "";
    maxNumberOfparticipants: number = 0;
    hoursOfDuration:number = 0;
    typeOfEvent: string = "";//livre, acadêmico, celebração
    eventHost:string[] = [];//usar class EventHost
    guests: string[] = []; 

    emitCertificate(typeOfEvent: string, guests:string[], hoursOfDuration: number, eventName: string){
        if(typeOfEvent = "livre" || "acadêmico"){
        forEach(guests.id =>
            console.log `Certifico participação de ${hoursOfDuration} no evento ${typeOfEvent} ${eventName}`)
        } else {
            console.log("este evento não gera certificado de participação");
        };
    }

};