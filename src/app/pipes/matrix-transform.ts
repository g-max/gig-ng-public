import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'matrixSize'})
export class MatrixTransformPipe implements PipeTransform {
  transform(matrix: string[][]) {
    if (!matrix || !Object.keys(matrix).length || !matrix[0].length) {
      return 0;
    }

    return Object.keys(matrix).length * matrix[0].length;
  }
}
