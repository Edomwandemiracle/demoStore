/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataholderService } from './dataholder.service';

describe('Service: Dataholder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataholderService]
    });
  });

  it('should ...', inject([DataholderService], (service: DataholderService) => {
    expect(service).toBeTruthy();
  }));
});
