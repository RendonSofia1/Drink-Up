import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DenegadoPage } from './denegado.page';

describe('DenegadoPage', () => {
  let component: DenegadoPage;
  let fixture: ComponentFixture<DenegadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DenegadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
