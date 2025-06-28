import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTable } from './main-table';

describe('MainTanle', () => {
  let component: MainTable;
  let fixture: ComponentFixture<MainTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
