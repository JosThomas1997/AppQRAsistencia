import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorinfoPage } from './profesorinfo.page';

describe('ProfesorinfoPage', () => {
  let component: ProfesorinfoPage;
  let fixture: ComponentFixture<ProfesorinfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
