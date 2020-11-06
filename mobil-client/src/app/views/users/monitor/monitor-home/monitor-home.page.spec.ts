import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorHomePage } from './monitor-home.page';

describe('MonitorHomePage', () => {
  let component: MonitorHomePage;
  let fixture: ComponentFixture<MonitorHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
