import { Pipe, PipeTransform } from '@angular/core';
import { StateNum } from '../gis/models/enums/stateNum';

@Pipe({ name: 'getKeyByValue' })
export class GetKeyByValue implements PipeTransform {
  transform(value: string): string {
    const indexOfS = Object.values(StateNum).indexOf(
      value as unknown as StateNum
    );
    const key = Object.keys(StateNum)[indexOfS];

    return key.replace(/[A-Z]/g, ' $&');
  }
}
