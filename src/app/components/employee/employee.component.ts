import { Component, OnInit } from '@angular/core';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

class Employee {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    //public dob: any = null,
    public email: string = '',
    public password: string = '',
    public country: string = 'Select country'
  ) {}
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  // It maintains list of Registrations
  employees: Employee[] = [];
  // It maintains registration Model
  empModel: Employee;

  // It maintains registration form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;
  // It maintains Array of countries.
  countries: string[] = ['US', 'UK', 'India', 'UAE'];
  constructor() {
    // Add default registration data.
    this.employees.push(new Employee('Johan', 'Peter', 'johan@gmail.com', 'johan123', 'UK'));
    this.employees.push(new Employee('Mohamed', 'Tariq', 'tariq@gmail.com', 'tariq123', 'UAE'));
    this.employees.push(new Employee('Nirmal', 'Kumar', 'nirmal@gmail.com', 'nirmal123', 'India'));
  }

  ngOnInit() {}

  // // This method associate to New Button.
  onNew() {
    this.showNew = true;
    this.empModel = new Employee();
    this.submitType = 'Save';
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      this.employees.push(this.empModel);
    } else {
      // Update the existing properties values based on model.
      this.employees[this.selectedRow].firstName = this.empModel.firstName;
      this.employees[this.selectedRow].lastName = this.empModel.lastName;
      this.employees[this.selectedRow].email = this.empModel.email;
      this.employees[this.selectedRow].password = this.empModel.password;
      this.employees[this.selectedRow].country = this.empModel.country;
    }
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    this.selectedRow = index;
    this.empModel = new Employee();
    this.empModel = Object.assign({}, this.employees[this.selectedRow]);
    this.submitType = 'Update';
    this.showNew = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding registration entry from the list.
    this.employees.splice(index, 1);
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Bootstrap dropdown selection change.
  onChangeCountry(country: string) {
    // Assign corresponding selected country to model.
    this.empModel.country = country;
  }

}
