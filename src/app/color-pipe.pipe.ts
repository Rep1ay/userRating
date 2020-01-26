import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {

  transform(value: any): any {
    debugger
    return null;
  }

}
