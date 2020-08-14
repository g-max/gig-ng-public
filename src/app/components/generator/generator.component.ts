import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  generatedArray: Observable<string[][]>;

  char = '';

  constructor(
    private generatorService: GeneratorService
  ) { }

  ngOnInit() {
    this.generatedArray = this.generatorService.generatedMatrix$;
  }

  generateGrid() {
    this.generatorService.generateRandomMatrix(this.char);
  }

}
