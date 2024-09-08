import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassrecoPage } from './passreco.page';

describe('PassrecoPage', () => {
  let component: PassrecoPage;
  let fixture: ComponentFixture<PassrecoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PassrecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
