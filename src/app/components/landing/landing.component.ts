import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter, IExcercise, Joint, Tool } from '../../interfaces/interfaces';
import { ExcerciseService } from 'src/app/services/excercise/excercise.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  excercises!: IExcercise[];
  displayedExcercises!: IExcercise[];
  // signals!: Signal[];
  tools!: Tool[];
  joints!: Joint[];
  filters: Filter[] = [];
  filterIsopen: boolean = false;
  filterForm!: FormGroup;
  searchTerm: string = '';

  constructor (private _excerciseService: ExcerciseService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.getData();
  }

  ngOnInit(): void {
    // incializes formgroup and define form controls structure
    this.filterForm = this.formBuilder.group({
      joint: [''],
      tool: ['']
    });
  }

  // whenever user adds or
  onSearchTermChange() {
    let currentExcercises = this.filterByToolsAndJoints(this.displayedExcercises);
    this.displayedExcercises = this.searchTerm  === '' ?  this.filterByToolsAndJoints(this.excercises) : currentExcercises.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  onAddFilter(): void {
    this.applyCurrentFilters();
    this.resetFilterForm();
  }

  onRemoveFilter(filter: Filter): void {
    // remove clicked filter from array of filters
    const filterIndex = this.filters.findIndex(items => items.joint.toLowerCase() === filter.joint.toLowerCase() && items.tool.toLowerCase() === filter.tool.toLowerCase())
    this.filters.splice(filterIndex, 1);

    // reapply filters
    this.applyFilter();

    // Reaply search term filter in case filter fields were removed but text was left in searchbar
    this.onSearchTermChange();
  }
  
  applyCurrentFilters() {
    // check if filter already exists
    const filterExists = this.filterExists();

    // check if filter fields have empty values
    const filterIsInvalid = this.filterIsInvalid(this.filterForm.value);

    // return if filter already exists or filter is invalid because of empty values                                                 
    if(filterExists || filterIsInvalid) {
      this.filterIsopen = !this.filterIsopen;
      return;
    }

    // add new filter field in array
    this.filters.push(this.filterForm.value);

    // apply all the filters
    this.applyFilter();

    // close filter fields container
    this.filterIsopen = !this.filterIsopen;
  }

  applyFilter(): void {
    // Applies current filter items found in filter array to data
    // if currently filter array has items, view will render filtered excercies, if not original excercises recieved from fetch
    this.displayedExcercises = this.hasFilters() ? this.filterByToolsAndJoints(this.excercises) : this.excercises;

    // Apply search term filter
    this.onSearchTermChange();
}

  // returns boolean based on if filter array currently contains items or not
  hasFilters(): boolean {
    return this.filters.length > 0 ? true : false;
  }

  // returns boolean based on if filter already exits in filter array or not
  filterExists(): boolean {
    const tryFindFilter = this.filters.filter(e => e.joint.toLowerCase() === this.filterForm.controls["joint"].value.toLowerCase() &&
                                              e.tool.toLowerCase() === this.filterForm.controls["tool"].value.toLowerCase());
    return tryFindFilter.length > 0 ? true : false;
  }

  // returns boolean based on if filter option are valid or not
  filterIsInvalid(filter: Filter): boolean {
    return filter.joint === '' && filter.tool === '' ? true : false;
  }

  // Recursively filters excercises, based on array of filters
  filterByToolsAndJoints(excercises: IExcercise[]): IExcercise[] {
    return this.hasFilters() ? excercises.filter(el => 
      this.filters.some(f => 
        f.joint ? f.joint.toLowerCase() === el.joint.toLowerCase() : excercises || f.tool ? el.tools.includes(f.tool.toLowerCase()) : excercises
    )) : excercises;
  }
  
  // resets the value of filter formControls to default
  resetFilterForm() {
    this.filterForm.controls['joint'].setValue('');
    this.filterForm.controls['tool'].setValue('');
  }

  getData() {
    this._excerciseService.getExcercise().then(res => {
      this.excercises = res;
      this.displayedExcercises = this.excercises;
      this.cdr.detectChanges();
    });

    this._excerciseService.getTools().then(res => {
      this.tools = [{id: '', name: ''},...res];
      this.cdr.detectChanges();
    });

    // this._excerciseService.getSignals().then(res => {
    //   this.signals = [{id: '', name: ''},...res];
    //   this.cdr.detectChanges();
    // });

    this._excerciseService.getJoints().then(res => {
      this.joints = [{id: '', name: ''},...res];
      this.cdr.detectChanges();
    });
  }
}
