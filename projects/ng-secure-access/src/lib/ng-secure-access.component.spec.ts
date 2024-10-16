import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSecureAccessComponent } from './ng-secure-access.component';

describe('NgSecureAccessComponent', () => {
  let component: NgSecureAccessComponent;
  let fixture: ComponentFixture<NgSecureAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSecureAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgSecureAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
