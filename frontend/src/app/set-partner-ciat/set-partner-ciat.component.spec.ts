import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPartnerCiatComponent } from './set-partner-ciat.component';

describe('SetPartnerCiatComponent', () => {
  let component: SetPartnerCiatComponent;
  let fixture: ComponentFixture<SetPartnerCiatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPartnerCiatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPartnerCiatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
