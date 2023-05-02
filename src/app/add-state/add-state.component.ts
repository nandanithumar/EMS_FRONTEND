import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../state-component/state.service';
import { Description, State } from '../state.model';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})

export class AddStateComponent {
  state:State = new State();
  submitted = false;
  isSave=false;
  errorArray: any[]=[];
  

  constructor(private stateService:StateService){}

  ngOnInit() {  
    this.submitted = false;

  }

  statesaveform : FormGroup = new FormGroup({
    id:new FormControl(),
    name: new FormControl('', [
      Validators.required
        ]),
    refObjectUri: new FormControl(),
    isInitialState: new FormControl(true, [
      Validators.required,
    ]),
    formattedDescription : new FormControl('',
     [Validators.required
    ]),

    plainDescription : new FormControl('',
     [Validators.required
    ]),

  });

 

  saveState(state: State) {
    console.log(state)
    this.state = new State();
    this.state.id=this.ID?.value;
    this.state.name = this.Name?.value;
    this.state.refObjectUri = this.RefObjUri?.value;
    this.state.isInitialState = this.IsInitialstate?.value;
    this.state.description = new Description();
    (this.state.description as Description).formatted =this.FormatedDes?.value;
    (this.state.description as Description).plain =this.PlainDes?.value;
    let date = new Date();

    // console.log(typeof date);
    this.state.effectiveDate=date.toJSON();
    date.setDate(date.getDate() + 30);
    this.state.expirationDate=date.toJSON();
    this.submitted = true;
    this.save();
  }

  onChange(){
    console.log(this.statesaveform)
  }

  // save() {
  //   console.log(this.state)
  //   this.stateService.createState(this.state).subscribe(
  //     (data) => console.log(data),
  //     (error) => console.log(error)
  //   );
  //   this.state = new State();
  // }

  save() {
    console.log(this.state);
    this.stateService.createState(this.state).subscribe(
      (data) => {
        this.isSave=true;
        console.log(data);
      },
      (error) => {
        for (let i = 0; i < error.error.length; i++) {
          const errorLevel = error.error[i].level;
          const errorMessage = error.error[i].message;
          const errorMessageElement = document.getElementById("error-message");
          const errorPopupElement = document.getElementById("error-popup");
          this.errorArray.push(errorMessage)
          // if (errorLevel === "ERROR" && errorMessageElement != null && errorPopupElement != null) {
          //   alert(errorMessage)
          // } else if(errorLevel === "WARN") {
          //   alert(errorMessage)
          // }
        }
        alert(this.errorArray)
      }
      
    );
    this.state = new State();
  }


  


  get ID(){
    return this.statesaveform.get('id');
  }
  get Name() {
    return this.statesaveform.get('name');
  }

  get RefObjUri() {
    return this.statesaveform.get('refObjectUri');
  }

  get IsInitialstate() {
    return this.statesaveform.get('isInitialState');
  }

  get PlainDes() {
    return this.statesaveform.get('plainDescription');
  }
  get FormatedDes() {
    return this.statesaveform.get('formattedDescription');
  }

  addEmployeeForm() {
    this.submitted = false;
    this.statesaveform.reset();
  }

  onSubmit() {
    if (this.statesaveform.valid) {
      this.saveState(this.state);
    } else {
      alert('Form is invalid')
    }
  }

  changeisUpdate() {
    this.isSave = false;
  }
  
}

