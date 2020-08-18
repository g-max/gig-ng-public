import {
  Directive,
  ElementRef,
  OnInit,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appLettersOnly]'
})
export class LettersOnlyDirective implements OnInit {

  private specialKeys: Array<string> = ['Backspace', 'Home', 'Clear',
    'Control', 'Shift', 'ArrowLeft', 'ArrowLeft'];

  protected regex: RegExp;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.regex = new RegExp('[a-z]', 'g');
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    if (this.specialKeys.indexOf(event.key) !== -1 || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const next: string = current.substring(0, this.el.nativeElement.selectionStart)
      + event.key + current.substring(this.el.nativeElement.selectionEnd);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
