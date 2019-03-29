import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnforderungComponent } from './create-anforderung.component';

describe('CreateAnforderungComponent', () => {
  let component: CreateAnforderungComponent;
  let fixture: ComponentFixture<CreateAnforderungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnforderungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnforderungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
