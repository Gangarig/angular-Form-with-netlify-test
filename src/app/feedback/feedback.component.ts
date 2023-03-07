import { Component } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetlifyFormsService } from '../netlify-forms/netlify-forms.service';
import { Feedback } from './feedback';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private netlifyForms: NetlifyFormsService
 ) {}

  feedbackForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    type: ['', Validators.required],
    description: ['', Validators.required],
    rating: [0, Validators.min(1)]
  });

  errorMsg = '';

  closeError() {
    this.errorMsg = '';
  }
  onSubmit() {
    this.netlifyForms.submitFeedback(this.feedbackForm.value as Feedback ).subscribe(
       () => {
         this.feedbackForm.reset();
         this.router.navigateByUrl('/success');
       },
       err => {
         this.errorMsg = err;
       }
     );
    }

  // ...
}
