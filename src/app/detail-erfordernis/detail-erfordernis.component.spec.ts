import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailErfordernisComponent } from './detail-erfordernis.component';

describe('DetailErfordernisComponent', () => {
  let component: DetailErfordernisComponent;
  let fixture: ComponentFixture<DetailErfordernisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailErfordernisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailErfordernisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
