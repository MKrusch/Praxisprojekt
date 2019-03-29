import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSzenarioComponent } from './detail-szenario.component';

describe('DetailSzenarioComponent', () => {
  let component: DetailSzenarioComponent;
  let fixture: ComponentFixture<DetailSzenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSzenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSzenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
