import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorasisPage } from './profesorasis.page';

describe('ProfesorasisPage', () => {
  let component: ProfesorasisPage;
  let fixture: ComponentFixture<ProfesorasisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorasisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
