import {State} from "./state.model";

export default class Page{
    content? : State[];
    pageable? : {
        sort? : {
            empty? : boolean; 
            unsorted? : boolean;
            sorted? : boolean;
        };
        offset? : number;
        pageNumber? : number;
        pageSize? : number;
        paged? : boolean;
        unpaged? : boolean;
    };
    totalElements? : number;
    totalPages? : number;
    last? : boolean;
    size? : number;
    number? : number;
    sort? : {
        empty? : boolean; 
        unsorted? : boolean;
        sorted? : boolean;
    };
    numberOfElements? : number;
    first? : boolean;
    empty? : boolean;
}