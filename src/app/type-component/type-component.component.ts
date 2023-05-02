import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Page from '../page.model';
import { Type } from '../type.model';
import { Typeservice } from './type.service';

@Component({
  selector: 'app-type-component',
  templateUrl: './type-component.component.html',
  styleUrls: ['./type-component.component.css'],
})
export class TypeComponentComponent implements OnInit {
  constructor(private typeService: Typeservice) {}

  types!: Type[];
  type: Type = new Type();
  uniqueUris: string[] = [];
  uniqueNames: string[] = [];
  uniqueInitialType: boolean | undefined;
  selectedUri: string = '';
  selectedName: string = '';
  selectedInitialType = true;
  selectedType: Type = new Type();
  isupdated = false;
  sortAsc = true;
  searchTerm: string = '';
  searchResults: Type[] = [];
  inputValue!: string;
  typeList: any;
  currentType: Type = { id: '0', name: 'NNu', refObjectUri: 'uri' };
  page: number = 0;
  count!: number;




  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  ngOnInit() {
    this.inputValue = (
      document.getElementById('searchTerm') as HTMLInputElement
    ).value;
    this.typeService
      .searchTypesByRefObjectUriAndName([], '', '', '', 0, 0)
      .subscribe((data) => {
        this.count = data.totalElements as number;
        this.typeService
          .searchTypesByRefObjectUriAndName(
            [],
            '',
            '',
            '',
            this.page,
            this.tableSize
          )
          .subscribe((data) => {
            this.types = data.content as Type[];
            // this.count = data.numberOfElements as number;
            console.log(this.count);
            this.uniqueNames = Array.from(
              new Set(this.types.map((type) => type.name))
            ).filter((name) => name !== undefined) as string[];

            // Get unique URIs
            this.uniqueUris = Array.from(
              new Set(this.types.map((type) => type.refObjectUri))
            ).filter((uri) => uri !== undefined) as string[];
          });
      });
  }

  onTableDataChange(event: any) {
    console.log('called');
    this.page = event;
    console.log(event);
    this.typeService
      .searchTypesByRefObjectUriAndName(
        [],
        '',
        '',
        '',
        this.page - 1,
        this.tableSize
      )
      .subscribe((data) => {
        this.types = data.content as Type[];
        // this.count = data.numberOfElements as number;
      });
  }

  searchValue() {
    let val = (document.getElementById('searchTerm') as HTMLInputElement).value;
    console.log(' meri value badali gai hain');
    if (val === '') {
      this.typeService
        .searchTypesByRefObjectUriAndName([], '', '', '', 0, 10)
        .subscribe((data) => {
          this.types = data.content as Type[];


          this.uniqueNames = Array.from(
            new Set(this.types.map((type) => type.name))
          ).filter((name) => name !== undefined) as string[];

          // Get unique URIs
          this.uniqueUris = Array.from(
            new Set(this.types.map((type) => type.refObjectUri))
          ).filter((uri) => uri !== undefined) as string[];
        });
    } else {
      this.search();
    }
  }

  get filteredTypes(): Type[] {
    let type: Type[];
    if (this.selectedUri === '' && this.selectedName === '') {
      type = this.types;
    } else {
      if (this.selectedUri !== '' && this.selectedName === '') {
        type = this.types.filter(
          (type) => type.refObjectUri === this.selectedUri
        );
      } else if (this.selectedUri === '' && this.selectedName !== '') {
        type = this.types.filter((type) => type.name === this.selectedName);
      } else {
        type = this.types.filter(
          (type) =>
            type.name === this.selectedName &&
            type.refObjectUri === this.selectedUri
        );
      }
    }
    return type;
  }

  set filteredTypes(types: Type[]) {
    this.types = types;
  }

  sortById(order: 'asc' | 'desc'): void {
    this.filteredTypes.sort((a, b) => {
      if (a.id === undefined || b.id === undefined) {
        return 0;
      }
      const comparison = a.id.localeCompare(b.id);
      return order === 'asc' ? comparison : -comparison;
    });
  }

  sortDirection = 'asc';

  sortByName(order: 'asc' | 'desc'): void {
    this.filteredTypes.sort((a, b) => {
      if (a.name === undefined || b.name === undefined) {
        return 0;
      }
      const comparison = (a.name as string).localeCompare(b.name as string);
      return order === 'asc' ? comparison : -comparison;
    });
  }

  sortByRefObjUri(order: 'asc' | 'desc'): void {
    this.filteredTypes.sort((a, b) => {
      if (a.refObjectUri === undefined || b.refObjectUri === undefined) {
        return 0;
      }
      const comparison = (a.refObjectUri as string).localeCompare(
        b.refObjectUri as string
      );
      return order === 'asc' ? comparison : -comparison;
    });
  }

  sortBystateId(order: 'asc' | 'desc'): void {
    this.filteredTypes.sort((a, b) => {
      if (a.stateId === undefined || b.stateId === undefined) {
        return 0;
      }
      const comparison = (a.stateId as string).localeCompare(
        b.stateId as string
      );
      return order === 'asc' ? comparison : -comparison;
    });
  }

  search() {
    this.types = [];
    this.searchTerm = (
      document.getElementById('searchTerm') as HTMLInputElement
    ).value;
    this.typeService
      .searchTypesByRefObjectUriAndName([], '', '', this.searchTerm, 0, 10)
      .subscribe((data: Page) => {
        const myData = data.content;
        this.types.push(...(myData as Type[]));
        console.log(this.searchResults);
      });
    this.typeService
      .searchTypesByRefObjectUriAndName([], '', this.searchTerm, '', 0, 10)
      .subscribe((data: Page) => {
        const myData = data.content;
        this.types.push(...(myData as Type[]));
        console.log(this.types)
      });
  }

  deleteType(type: Type): void {
    console.log(
      'DELETE METHOD HAS BEEN CALLED-----------------------------------'
    );
    if (type.id !== undefined) {
      this.typeService.deleteType(type.id).subscribe(
        (data) => {
          console.log("Here")
          console.log(data);
          this.typeService
            .searchTypesByRefObjectUriAndName(
              [],
              '',
              '',
              '',
              this.page,
              this.tableSize
            )
            .subscribe((data) => {
              console.log(data);
              this.types = data.content as Type[];
            });
        },
        (error) => {
          console.log("Here with error")
          this.typeService
            .searchTypesByRefObjectUriAndName(
              [],
              '',
              '',
              '',
              this.page,
              this.tableSize
            )
            .subscribe((data) => {
              console.log(data);
              this.types = data.content as Type[];
            });
          console.log(error)}
      );
      this.onTableDataChange;
    }
  }

  editType(id: string | undefined, type: Type): void {
    this.currentType = type;
    if (id) {
      console.log(id);
      console.log(this.typeList);
      this.typeService.updateType(type).subscribe(
        (data) => {
          console.log(data);
          const index = this.types.findIndex((s) => s.id === id);
          this.types[index] = type;
          this.selectedType = new Type();
        },
        (error) => console.log(error)
      );
    }
  }

  TypeUpdateForm = new FormGroup({
    id: new FormControl(),
    stateId: new FormControl(),
    name: new FormControl(),
    refObjectUri: new FormControl(),
  });

  updateType(oldType: Type) {
    console.log(oldType);
    this.type.id = this.Id!.value;
    this.type.name = this.Name!.value;
    this.type.stateId = this.stateId!.value;
    this.type.refObjectUri = this.RefObjUri!.value;
    this.type.effectiveDate = oldType.effectiveDate;
    this.type.expirationDate = oldType.expirationDate;
    this.type.description = oldType.description;
    this.type.meta = oldType.meta;
    this.typeService.updateType(this.type).subscribe(
      (data) => {
        this.isupdated = true;
        this.typeService.searchTypesByRefObjectUriAndName([],'','',"",0,5).subscribe((data) => {
          this.types = data.content as Type[];

        });
      },
      (error) => console.log(error)
    );
  }
  get Id() {
    return this.TypeUpdateForm.get('id');
  }

  get Name() {
    return this.TypeUpdateForm.get('name');
  }

  get stateId() {
    return this.TypeUpdateForm.get('stateId');
  }

  get RefObjUri() {
    return this.TypeUpdateForm.get('refObjectUri');
  }

  changeisUpdate() {
    this.isupdated = false;
  }
}
