/*
*All common directives
*Note : On add new directive please add it in directives.module.ts file also
*/
import { Directive, ElementRef, AfterViewInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
declare const $: any;

/*
*For prevent to type all except 1 to 9 and backspace,etc
*/
@Directive({ selector: '[appNumbersOnly]' })
export class NumbersOnlyDirective {
  @HostListener('keydown', ['$event']) onKeyDown(e) {
    console.log(e.keyCode);
    // Allow: backspace, delete, tab, escape, enter and . (110 for . which is removed)
    if ([46, 8, 9, 27, 13, 190, 116].indexOf(e.keyCode) !== -1 ||
      (e.keyCode == 65 && e.ctrlKey === true) ||
      (e.keyCode == 67 && e.ctrlKey === true) ||
      (e.keyCode == 86 && e.ctrlKey === true) ||
      (e.keyCode == 116 && e.ctrlKey === true) ||
      (e.keyCode == 88 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
}
