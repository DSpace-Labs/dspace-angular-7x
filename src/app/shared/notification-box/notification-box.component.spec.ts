import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBoxComponent } from './notification-box.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  AdminNotifyMetricsBox
} from '../../admin/admin-notify-dashboard/admin-notify-metrics/admin-notify-metrics.model';

describe('NotificationBoxComponent', () => {
  let component: NotificationBoxComponent;
  let fixture: ComponentFixture<NotificationBoxComponent>;
  let mockBoxConfig: AdminNotifyMetricsBox;

  beforeEach(async () => {
    mockBoxConfig = {
      'color': '#D4EDDA',
      'title': 'admin-notify-dashboard.delivered',
      'config': 'NOTIFY.outgoing.delivered',
      'count': 79
    };

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ NotificationBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationBoxComponent);
    component = fixture.componentInstance;
    component.boxConfig = mockBoxConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
