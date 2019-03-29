import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateErfordernisComponent } from './create-erfordernis.component';

describe('CreateErfordernisComponent', () => {
  let component: CreateErfordernisComponent;
  let fixture: ComponentFixture<CreateErfordernisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateErfordernisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateErfordernisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
