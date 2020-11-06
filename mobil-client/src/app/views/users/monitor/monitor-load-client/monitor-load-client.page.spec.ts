import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorLoadClientPage } from './monitor-load-client.page';

describe('MonitorLoadClientPage', () => {
  let component: MonitorLoadClientPage;
  let fixture: ComponentFixture<MonitorLoadClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorLoadClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorLoadClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
