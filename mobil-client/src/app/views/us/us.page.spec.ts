import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsPage } from './us.page';

describe('UsPage', () => {
  let component: UsPage;
  let fixture: ComponentFixture<UsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
