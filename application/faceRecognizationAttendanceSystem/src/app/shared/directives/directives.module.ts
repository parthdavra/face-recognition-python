import { NgModule } from '@angular/core';
//import { HighlightDirective } from './common.directive';
import { NumbersOnlyDirective} from './common.directive';

@NgModule({
  imports: [],
  declarations: [NumbersOnlyDirective],
  exports: [NumbersOnlyDirective]
})
export class DirectivesModule { }