import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { data } from 'jquery';
import Page from '../page.model';
import {Description, State} from '../state.model';
import { StateService } from './state.service';

@Component({
  selector: 'app-state-component',
  templateUrl: './state-component.component.html',
  styleUrls: ['./state-component.component.css'],
})
export class StateComponentComponent implements OnInit {
  constructor(private stateService: StateService) {}

  states!: State[];
  state: State = new State();
  uniqueUris: string[] = [];
  uniqueNames: string[] = [];
  uniqueInitialState: boolean | undefined;
  selectedUri: string = '';
  selectedName: string = '';
  selectedInitialState = true;
  selectedState: State = new State();
  isupdated = false;
  sortAsc = true;
  searchTerm: string = '';
  searchResults: State[] = [];
  inputValue!: string;
  stateList:any;
  currentState : State = {id : '0', name : "NNu", refObjectUri : "uri", isInitialState : true};
  page: number = 0;
  count!: number;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  ngOnInit() {
    this.inputValue = (
      document.getElementById('searchTerm') as HTMLInputElement
    ).value;
    this.stateService.searchStatesByRefObjectUriAndName([], '', '', 0, 0).subscribe(data=> {
      this.count = data.totalElements as number;
      this.stateService.searchStatesByRefObjectUriAndName([],'','',this.page,this.tableSize).subscribe((data) => {
        this.states = data.content as State[];

        this.uniqueNames = Array.from(
          new Set(this.states.map((state) => state.name))
        ).filter((name) => name !== undefined) as string[];
  
        // Get unique URIs
        this.uniqueUris = Array.from(
          new Set(this.states.map((state) => state.refObjectUri))
        ).filter((uri) => uri !== undefined) as string[];
      });
    })
    
  }

  onTableDataChange(event: any) {
    console.log("called")
    this.page = event;
    console.log(event)
    this.stateService.searchStatesByRefObjectUriAndName([],'','',this.page-1,this.tableSize).subscribe((data)=>{
      this.states = data.content as State[];
      // this.count = data.numberOfElements as number;
      this.uniqueNames = Array.from(
        new Set(this.states.map((state) => state.name))
      ).filter((name) => name !== undefined) as string[];

      // Get unique URIs
      this.uniqueUris = Array.from(
        new Set(this.states.map((state) => state.refObjectUri))
      ).filter((uri) => uri !== undefined) as string[];
    });

  }

  searchValue() {
    let val = (document.getElementById('searchTerm') as HTMLInputElement).value;
    console.log(' meri value badali gai hain');
    if (val === '') {
      this.stateService.isSearching.next(false);
      this.stateService.searchStatesByRefObjectUriAndName([],'','',0,10).subscribe((data) => {
        this.states = data.content as State[];

        this.uniqueNames = Array.from(
          new Set(this.states.map((state) => state.name))
        ).filter((name) => name !== undefined) as string[];

        // Get unique URIs
        this.uniqueUris = Array.from(
          new Set(this.states.map((state) => state.refObjectUri))
        ).filter((uri) => uri !== undefined) as string[];
      });
    } else {
      this.stateService.isSearching.next(true);
      this.search();
    }
  }

  get filteredStates(): State[] {
    let state: State[];
    if (this.selectedUri === '' && this.selectedName === '') {
      state = this.states;
    } else {
      if (this.selectedUri !== '' && this.selectedName === '') {
        state = this.states.filter(
          (state) => state.refObjectUri === this.selectedUri
        );
      } else if (this.selectedUri === '' && this.selectedName !== '') {
        state = this.states.filter((state) => state.name === this.selectedName);
      } else {
        state = this.states.filter(
          (state) =>
            state.name === this.selectedName &&
            state.refObjectUri === this.selectedUri
        );
      }
    }
    return state;
  }

  set filteredStates(states : State[]){
    this.states = states;
  }

  sortById(order: 'asc' | 'desc'): void {
    this.filteredStates.sort((a, b) => {
      if (a.id === undefined || b.id === undefined) {
        return 0;
      }
      const comparison =a.id.localeCompare(b.id);
      return order === 'asc' ? comparison : -comparison;
    });
  }

  sortDirection = 'asc';

  sortByName(order: 'asc' | 'desc'): void {
    this.filteredStates.sort((a, b) => {
      if (a.name === undefined || b.name === undefined) {
        return 0;
      }
      const comparison = (a.name as string).localeCompare(b.name as string);
      return order === 'asc' ? comparison : -comparison;
    });
  }

  sortByRefObjUri(order: 'asc' | 'desc'): void {
    this.filteredStates.sort((a, b) => {
      if (a.refObjectUri === undefined || b.refObjectUri === undefined) {
        return 0;
      }
      const comparison = (a.refObjectUri as string).localeCompare(b.refObjectUri as string);
      return order === 'asc' ? comparison : -comparison;
    });
  }

  sortByIsInitialState(order: 'asc' | 'desc'): void {
    this.filteredStates.sort((a, b) => {
      if (a.isInitialState === undefined || b.isInitialState === undefined) {
        return 0;
      }
      const comparison =
        a.isInitialState === b.isInitialState ? 0 : a.isInitialState ? -1 : 1;
      return order === 'asc' ? comparison : -comparison;
    });
  }

  search() {
    this.states = [];
    this.searchTerm = (
      document.getElementById('searchTerm') as HTMLInputElement
    ).value;
    if(this.searchTerm.trim().length>2){
    this.stateService
      .searchStatesByRefObjectUriAndName([], '', this.searchTerm, 0, 10)
      .subscribe((data: Page) => {
        const myData = data.content;
        this.states.push(...(myData as State[]));
        console.log(this.searchResults);
      });
    this.stateService
      .searchStatesByRefObjectUriAndName([], this.searchTerm, '', 0, 10)
      .subscribe((data: Page) => {
        const myData = data.content;
        this.states.push(...(myData as State[]));
      });
    }
    else{
      this.stateService.searchStatesByRefObjectUriAndName([],'','',this.page,this.tableSize).subscribe((data) => {
        this.states = data.content as State[];
      })
    }
  }

  deleteState(state: State): void {
    console.log("DELETE METHOD HAS BEEN CALLED-----------------------------------")
    if (state.id !== undefined) {
      this.stateService.deleteState(state.id).subscribe(
        (data) => {
          console.log(data);
          this.stateService.searchStatesByRefObjectUriAndName([],'','',this.page,this.tableSize).subscribe(
            (data) => {
              console.log(data)
              this.states = data.content as State[];
            }
          );
        },
        (error) => console.log(error)
      );
    }
  }

  editState(id: string | undefined, state: State): void {
    this.currentState = state;
    if (id) {
      console.log(id)
      console.log(this.stateList)
      this.stateService.updateState(id, state).subscribe(
        (data) => {
          console.log(data);
          const index = this.states.findIndex((s) => s.id === id);
          this.states[index] = state;
          this.selectedState = new State();
        },
        (error) => console.log(error)
      );
    }
  }

  StateUpdateForm = new FormGroup({
    id: new FormControl(),
    isInitialState: new FormControl(),
    name: new FormControl(),
    refObjectUri: new FormControl(),
  });

  updateState(oldState : State, updstate: State) {
    console.log(oldState)
    this.state.id = this.Id!.value;
    this.state.name = this.Name!.value;
    this.state.isInitialState = this.IsInitialState!.value;
    this.state.refObjectUri = this.RefObjUri!.value;
    this.state.effectiveDate = oldState.effectiveDate;
    this.state.expirationDate = oldState.expirationDate;
    this.state.description=oldState.description;
    this.state.meta=oldState.meta;    
    this.stateService
      .updateState(this.state.id, this.state)
      .subscribe(
        (data) => {
          this.isupdated = true;
          this.stateService.getStatesList().subscribe((data) => {
            this.states = data;
          });
        },
        (error) => console.log(error)
      );
  }
  get Id() {
    return this.StateUpdateForm.get('id');
  }

  get Name() {
    return this.StateUpdateForm.get('name');
  }

  get IsInitialState() {
    return this.StateUpdateForm.get('isInitialState');
  }

  get RefObjUri() {
    return this.StateUpdateForm.get('refObjectUri');
  }

  changeisUpdate() {
    this.isupdated = false;
  }
  }
