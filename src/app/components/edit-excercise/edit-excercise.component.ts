import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IExcercise, Joint, Signal, Tool } from 'src/app/interfaces/interfaces';
import { ExcerciseService } from 'src/app/services/excercise/excercise.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit-excercise',
  templateUrl: './edit-excercise.component.html',
  styleUrls: ['./edit-excercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditExcerciseComponent implements OnInit{
  excerciseForm!: FormGroup;
  loading = false;
  submitted = false;
  excercise!: IExcercise; 
  joints!: Joint[];
  tools!: Tool[];
  signals!: Signal[];
  excercisedId!: string;

  

  constructor(private formBuilder: FormBuilder, private _excerciseService: ExcerciseService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
    this.excercisedId = this.activatedRoute.snapshot.params['id'];
    this.getData(this.excercisedId);

    this.excerciseForm = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.maxLength(50)]],
      joint: ['', Validators.required],
      tools: [[]],
      signal: this.formBuilder.group({
        name: ['', [Validators.required]],
        min:  ['', [Validators.required]],
        max:  ['', [Validators.required]]
      })
    });
    
    
  }
  ngOnInit(): void {
    
  }
 
  getData(id: string) {
    this._excerciseService.getExcerciseById(id).then(res => {
      this.excercise = res;
      this.loadData();
      this.cdr.detectChanges();
    });
  }

  loadData() {
    this.excerciseForm.patchValue({
      name: this.excercise.name,
      joint: this.excercise.joint,
      tools: [...this.excercise.tools.map(item => item)],
      signal: {
        name: this.excercise.signal.id,
        min: this.excercise.signal.min,
        max: this.excercise.signal.max
      }
    });
    
    this._excerciseService.getTools().then(res => {
      this.tools = res;
      this.cdr.detectChanges();
    });

    this._excerciseService.getSignals().then(res => {
      this.signals = res;
      this.cdr.detectChanges();
    });

    this._excerciseService.getJoints().then(res => {
      this.joints = res;
      this.cdr.detectChanges();
    });
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.excerciseForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.excerciseForm.invalid) {
      return;
    }

    // set loading to true if you are going to realize http request here
    // this.loading = true;

    // and set it to false again when request is over
    // someService.someAction.subscribe({
    //   next: (res) => {
    //     some logic
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     some logic
    //   },
    //   complete: () => {
    //     some logic
    //   }
    // })

    console.log(this.excerciseForm.value);
  }
}
