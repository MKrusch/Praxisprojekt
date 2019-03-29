import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnforderungComponent } from './detail-anforderung.component';

describe('DetailAnforderungComponent', () => {
  let component: DetailAnforderungComponent;
  let fixture: ComponentFixture<DetailAnforderungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAnforderungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAnforderungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
