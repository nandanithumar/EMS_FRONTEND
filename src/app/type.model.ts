export class Type {
    id? : string ;
    description? : Description;
    effectiveDate? : Object;
    expirationDate? : Object;
    name?: string | null;
    stateId?:string;
    refObjectUri? : string | null;
    meta?: Meta;
  }
  
  export class Description{
      formatted? : string;
      plain? : string;
  }
  export class Meta {
    createdAt? : Date;
    createdBy? : string;
    updatedAt? : Date;
    updatedBy? : string;
  }