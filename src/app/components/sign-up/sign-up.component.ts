import { Component, OnInit, TemplateRef, AfterViewInit, ElementRef } from '@angular/core';

import{FormGroup,FormControl,FormBuilder,Validators, AbstractControl, ValidationErrors} from '@angular/forms'
import { ContactValidators } from './validators/contact.validators';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';


import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import * as $ from 'jquery'; 

@Component({
 
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit , AfterViewInit{
  Name: any;
  loader:boolean;
  imageUrls:String;
  minDate = new Date(1950, 1, 1);
  date = new Date();
  maxDate = new Date();
  error: boolean;
  signin: boolean;
form;
  constructor(fb:FormBuilder,
  private authService:AuthService,
  private router:Router,
  private el: ElementRef,
  private datePipe: DatePipe) {
    this.form=fb.group({
  firstname:['',[
    Validators.required,
     Validators.maxLength(30),
     ],
  ],
  lastname:['',[
    Validators.required,
     Validators.maxLength(30)
     ],
  ],
  surname:['',[
    Validators.required,
     Validators.maxLength(30)
     ],
  ],
  email:['',[
    Validators.required,
    Validators.email]
  ],

  password:['',[
  Validators.required],
  
],
  confirmPassword:['',[
  Validators.required]
  ],
  address:['',[
    Validators.required]
    ],
    dob:['',[
      Validators.required]
      ],
      imageUrl:['',[
        Validators.required]
        ],
  contact:['',[
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    ContactValidators.validContact]
  ],
  },
  {validator: this.passwordConfirming})

} 
passwordConfirming(c: AbstractControl): { invalid: boolean } {
  if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
  }
}
  ngOnInit() {}

  onSubmit(){
    let user:User=this.form.value;
    this.authService.registerUser(user).subscribe(data =>{
     
      if(data.success){
      this.form.reset()
      this.signin=true;
      setTimeout(() => {  
        
      this.router.navigate(['/login'])
      }, 3000);
      }
     else{
      this.error=true;
     
      setTimeout(() => {  
      
        this.router.navigate(['/signup'])

        }, 3000);
     }
   });
  }

  get firstname(){
    return this.form.get('firstname')
  }
  get surname(){
    return this.form.get('surname')
  }
  get lastname(){
    return this.form.get('lastname')
  }
  get email(){
    return this.form.get('email')
  }
  get password(){
    return this.form.get('password')
  }
  get contact(){
    return this.form.get('contact')
  }
  get confirmPassword() 
  { return this.form.get('confirmPassword'); }
  get address(){
    return this.form.get('address')
  }  get dob(){
    return this.form.get('dob')
  }

  get imageUrl(){
    return this.form.get('imageUrl')
  }
  
  ngAfterViewInit(){
    $(document).on('click', '.browse', function(){
      var file = $(this).parent().parent().parent().find('.file');
      file.trigger('click');
    });
  }
  fileChange(files: any){
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
            formData.append('photo', inputEl.files.item(i));
        }
      this.loader=true
        this.authService.PostImage(formData).subscribe(data => {
          this.loader=false;
          if(data.success){
           this.imageUrls=data.msg
           console.log(this.imageUrls)
          }
        
       })
    //  this.NameImage= files[0].name;
   }
  }
}
