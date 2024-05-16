export interface RegistrationCode {
    code: string;
}
export interface CodeValidation{
    isUsed : boolean;
    code : string;
    Level : string;
}
export interface registeration{
    level : string ;
    code : string ; 
    class : string; 
    name : string; 
    BuildingNumber : string; 
    subStreet : string; 
    street : string; 
    area : string; 
    floor : string; 
    flatNo : string; 
    Descrption : string; 
    whatsAppNo : string; 
    fatherPhone : string; 
    motherPhone : string; 
    birthday : string; 
    gender : string; 
    NationalId : string; 
    fatherMail : string; 
    motherMail : string; 
}
export interface level{
    id : string,
    name : string
}