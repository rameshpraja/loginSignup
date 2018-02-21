import { AbstractControl,ValidationErrors } from "@angular/forms";
export class ContactValidators{
    static validContact(control:AbstractControl) : ValidationErrors | null{
        if(isNaN(control.value ))
        return{ validContact :true};
        return null
    }
}