import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Typeservice } from '../type-component/type.service';
import { Description, Type } from '../type.model';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent {
type:Type = new Type();
submitted = false;
isSave=false;
errorArray: any[]=[];


constructor(private typeService:Typeservice){}

ngOnInit() {  
  this.submitted = false;

}

typesaveform : FormGroup = new FormGroup({
  id:new FormControl(),
  name: new FormControl('', [
    Validators.required
      ]),
  refObjectUri: new FormControl(),
  stateId: new FormControl(true, [
    Validators.required,
  ]),
  formattedDescription : new FormControl('',
   [Validators.required
  ]),

  plainDescription : new FormControl('',
   [Validators.required
  ]),

});



saveType(type: Type) {
  console.log(type)
  this.type = new Type();
  this.type.id=this.ID?.value;
  this.type.name = this.Name?.value;
  this.type.refObjectUri = this.RefObjUri?.value;
  this.type.stateId = this.stateId?.value;
  this.type.description = new Description();
  (this.type.description as Description).formatted =this.FormatedDes?.value;
  (this.type.description as Description).plain =this.PlainDes?.value;
  let date = new Date();

  // console.log(typeof date);
  this.type.effectiveDate=date.toJSON();
  date.setDate(date.getDate() + 30);
  this.type.expirationDate=date.toJSON();
  this.submitted = true;
  this.save();
}

onChange(){
  console.log(this.typesaveform)
}



save() {
  console.log(this.type);
  this.typeService.createType(this.type, this.RefObjUri?.value).subscribe(
    (data) => {
      this.isSave = true;
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
  this.type = new Type();
}





get ID(){
  return this.typesaveform.get('id');
}
get Name() {
  return this.typesaveform.get('name');
}

get RefObjUri() {
  return this.typesaveform.get('refObjectUri');
}

get stateId() {
  return this.typesaveform.get('stateId');
}

get PlainDes() {
  return this.typesaveform.get('plainDescription');
}
get FormatedDes() {
  return this.typesaveform.get('formattedDescription');
}

addEmployeeForm() {
  this.submitted = false;
  this.typesaveform.reset();
}

onSubmit() {
  if (this.typesaveform.valid) {
    this.saveType(this.type);
  } else {
    alert('Form is invalid')
  }
}

changeisUpdate() {
  this.isSave = false;
}

}

