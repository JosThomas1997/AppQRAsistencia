import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAsisPage } from './edit-asis.page';

describe('EditAsisPage', () => {
  let component: EditAsisPage;
  let fixture: ComponentFixture<EditAsisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAsisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
