import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPartnerCiatComponent } from './get-partner-ciat.component';

describe('GetPartnerCiatComponent', () => {
  let component: GetPartnerCiatComponent;
  let fixture: ComponentFixture<GetPartnerCiatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPartnerCiatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPartnerCiatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
