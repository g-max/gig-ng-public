import { Component, OnInit, Input } from '@angular/core';
// import { GeneratorService } from '../../services/generator.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  @Input() code = '';

  constructor(
    // generatorService: GeneratorService
  ) { }

  ngOnInit() {
  }

}
