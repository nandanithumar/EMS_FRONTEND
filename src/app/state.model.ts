export class State {
  id? : string ;
  description? : Description;
  effectiveDate? : Object;
  expirationDate? : Object;
  isInitialState? : boolean | null ;
  name?: string | null;
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