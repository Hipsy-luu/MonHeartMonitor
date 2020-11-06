import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorSelectClientPage } from './monitor-select-client.page';

describe('MonitorSelectClientPage', () => {
  let component: MonitorSelectClientPage;
  let fixture: ComponentFixture<MonitorSelectClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSelectClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorSelectClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
