import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IExcercise, Joint, Signal, Tool } from 'src/app/interfaces/interfaces';
import { ExcerciseService } from 'src/app/services/excercise/excercise.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit-excercise',
  templateUrl: './edit-excercise.component.html',
  styleUrls: ['./edit-excercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditExcerciseComponent{
  excerciseForm!: FormGroup;
  loading = false;
  submitted = false;
  excercise!: IExcercise; 
  joints!: Joint[];
  tools!: Tool[];
  signals!: Signal[];
  excercisedId!: string;

  

  constructor(private formBuilder: FormBuilder, private _excerciseService: ExcerciseService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
     // incialize form structure
     this.excerciseForm = this.formBuilder.group({
      id: ['', Validators.required],
      img: ['', Validators.required],
      joint: ['', Validators.required],
      name:  ['', [Validators.required, Validators.maxLength(50)]],
      tools: [[]],
      signal: this.formBuilder.group({
        name: ['', [Validators.required]],
        min:  ['', [Validators.required]],
        max:  ['', [Validators.required]]
      }, { validator: this.compareMinMax })
    });

    // get excercise id param from router
    this.excercisedId = this.activatedRoute.snapshot.params['id'];

    // fetch data and fill form
    this.getData(this.excercisedId);
  }

  
  onRemoveTool(tool: string) {
    //get the index of clicked tool from the tool list of excercise
    const toolIndex = this.excercise.tools.findIndex(items => items.toLowerCase() === tool.toLowerCase())

    // remove clicked tool from the list of tools of excercise, this will simulate a visual efect of tool removal, so user understands clicked tool was removed
    this.excercise.tools.splice(toolIndex, 1);

    // reasign the value of tools' form control field
    this.excerciseForm.controls["tools"].setValue(this.excercise.tools);
  }

  onToolChange(tool: string) {
    // get the list of current tools of excercise
    let currentTools = this.excerciseForm.controls['tools'].value;

    // if tool is not currently present
    if(!currentTools.includes(tool)) {
      // add tool in the list of tools of excercise
      this.excercise.tools.push(tool);

      // reasign the value of tools form control field
      this.excerciseForm.controls["tools"].setValue(this.excercise.tools);
    }
  }

  getData(id: string) {
    this._excerciseService.getExcerciseById(id).then(res => {
      this.excercise = res;
      // fill the form with current data of excercise
      this.loadData();
    });
  }
  
  compareMinMax(group: AbstractControl): {[key: string]: any} | null {
    const min = group.get('min')?.value;
    const max = group.get('max')?.value;

    return max > min ? null : {'minNotLower': true}
  }


  loadData() {
    
    this.excerciseForm.patchValue({
      id: this.excercise.id,
      img: this.excercise.img,
      joint: this.excercise.joint,
      name: this.excercise.name,
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
  get excerciseF() {
    return this.excerciseForm.controls;
  }

  get signalF() {
    return (this.excerciseForm.controls['signal'] as FormGroup).controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.excerciseForm.invalid) {
      console.log(this.excerciseForm.controls['signal'].errors)
      return;
    }

    // set loading to true so button is disable while http post is being done
    // this.loading = true;

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
    console.log(this.excerciseForm.value)
  }
}
