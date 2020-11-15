import { Component, OnInit, Input } from '@angular/core';
import { AlertData } from '../../../classes/alertData.class';
import { UtilitiesService } from '../../../services/utilities/utilities.service';
import { DataSessionService } from '../../../services/dataSession/data-session.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {
  @Input() alertData: AlertData;

  constructor(private utilitiesService : UtilitiesService, public dataSessionService : DataSessionService) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.utilitiesService.modalController.dismiss({
      'dismissed': true
    });
  }

}
