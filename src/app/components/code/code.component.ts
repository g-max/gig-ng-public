import { Component } from '@angular/core';
import { CodeService } from '../../services/code.service';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent {

  constructor(
    private codeService: CodeService
  ) { }

}
