import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorUserRegisterPage } from './monitor-user-register.page';

describe('MonitorUserRegisterPage', () => {
  let component: MonitorUserRegisterPage;
  let fixture: ComponentFixture<MonitorUserRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorUserRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorUserRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
