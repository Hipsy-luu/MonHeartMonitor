import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectionTypeUserPage } from './selection-type-user.page';

describe('SelectionTypeUserPage', () => {
  let component: SelectionTypeUserPage;
  let fixture: ComponentFixture<SelectionTypeUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionTypeUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionTypeUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
