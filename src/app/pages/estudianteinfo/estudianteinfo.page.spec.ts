import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudianteinfoPage } from './estudianteinfo.page';

describe('EstudianteinfoPage', () => {
  let component: EstudianteinfoPage;
  let fixture: ComponentFixture<EstudianteinfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
