import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorUserSettingsPage } from './monitor-user-settings.page';

describe('MonitorUserSettingsPage', () => {
  let component: MonitorUserSettingsPage;
  let fixture: ComponentFixture<MonitorUserSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorUserSettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorUserSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
