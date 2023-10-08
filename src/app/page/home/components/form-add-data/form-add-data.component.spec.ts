import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddDataComponent } from './form-add-data.component';

describe('FormAddDataComponent', () => {
  let component: FormAddDataComponent;
  let fixture: ComponentFixture<FormAddDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddDataComponent]
    });
    fixture = TestBed.createComponent(FormAddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
