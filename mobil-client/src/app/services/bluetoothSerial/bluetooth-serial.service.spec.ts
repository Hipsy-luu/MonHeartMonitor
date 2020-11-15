import { TestBed } from '@angular/core/testing';

import { BluetoothSerialService } from './bluetooth-serial.service';

describe('BluetoothSerialService', () => {
  let service: BluetoothSerialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BluetoothSerialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
