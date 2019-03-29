import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSzenarioComponent } from './create-szenario.component';

describe('CreateSzenarioComponent', () => {
  let component: CreateSzenarioComponent;
  let fixture: ComponentFixture<CreateSzenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSzenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSzenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
