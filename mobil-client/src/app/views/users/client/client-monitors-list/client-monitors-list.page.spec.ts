import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientMonitorsListPage } from './client-monitors-list.page';

describe('ClientMonitorsListPage', () => {
  let component: ClientMonitorsListPage;
  let fixture: ComponentFixture<ClientMonitorsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMonitorsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientMonitorsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
