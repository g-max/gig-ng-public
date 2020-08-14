import { TestBed } from '@angular/core/testing';

import { GeneratorService } from './generator.service';

describe('GeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneratorService = TestBed.get(GeneratorService);
    expect(service).toBeTruthy();
  });

  it('should generate random matrix', () => {
    const service: GeneratorService = TestBed.get(GeneratorService);
    service.generateRandomMatrix();

    const genMatrix = service.generatedMatrix$.getValue();
    expect(genMatrix.length).toBe(10);
    genMatrix.forEach(row => {
      expect(row.length).toBe(10);
      row.forEach(el => {
        expect(el).toMatch(/[a-z]/);
      });
    });
  });


  it('should generate needed proportion of symbols, when provided', () => {
    const service: GeneratorService = TestBed.get(GeneratorService);
    const numberOfExperiments = 1000000;

    const weighedOccurancesArray = new Array(numberOfExperiments).fill(0);
    for (let i = 0; i < numberOfExperiments; i++) {
      service.generateRandomMatrix('a');
      const genMatrix = service.generatedMatrix$.getValue();
      genMatrix.forEach(row => {
        row.forEach(el => {
          if (el === 'a') {
            weighedOccurancesArray[i]++;
          }
        });
      });
    }

    const expectedAvWeigth = weighedOccurancesArray.reduce(
      (a, b) => a + b
    ) / weighedOccurancesArray.length;

    // should be around 20% from readonly preferredCharWeight = 0.2
    expect(expectedAvWeigth).toBeGreaterThan(19.9);
    expect(expectedAvWeigth).toBeGreaterThan(20.1);
  });
});
