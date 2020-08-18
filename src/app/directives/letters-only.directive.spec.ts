import { LettersOnlyDirective } from './letters-only.directive';
import { ElementRef } from '@angular/core';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
}

describe('LettersOnlyDirective', () => {
  it('should create an instance', () => {
    const directive = new LettersOnlyDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
