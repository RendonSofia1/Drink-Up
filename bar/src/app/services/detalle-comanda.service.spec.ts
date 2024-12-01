import { TestBed } from '@angular/core/testing';

import { DetalleComandaService } from './detalle-comanda.service';

describe('DetalleComandaService', () => {
  let service: DetalleComandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleComandaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
