import { AuthorizationDataService } from '../authorization-data.service';
import { FeatureID } from '../feature-id';
import { Observable, of as observableOf } from 'rxjs';
import { Router, UrlTree, CanActivateFn } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { someFeatureAuthorizationGuard } from './some-feature-authorization.guard';

describe('someFeatureAuthorizationGuard', () => {
  let guard: CanActivateFn;
  let authorizationService: AuthorizationDataService;
  let router: Router;
  let authService: AuthService;

  let featureIds: FeatureID[];
  let authorizedFeatureIds: FeatureID[];
  let objectUrl: string;
  let ePersonUuid: string;

  function init() {
    featureIds = [FeatureID.LoginOnBehalfOf, FeatureID.CanDelete];
    authorizedFeatureIds = [];
    objectUrl = 'fake-object-url';
    ePersonUuid = 'fake-eperson-uuid';

    authorizationService = Object.assign({
      isAuthorized(featureId?: FeatureID): Observable<boolean> {
        return observableOf(authorizedFeatureIds.indexOf(featureId) > -1);
      }
    });
    router = jasmine.createSpyObj('router', {
      parseUrl: {}
    });
    authService = jasmine.createSpyObj('authService', {
      isAuthenticated: observableOf(true)
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthorizationDataService, useValue: authorizationService },
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService },
      ]
    });

    guard = someFeatureAuthorizationGuard(
      () => observableOf(featureIds),
      () => observableOf(objectUrl),
      () => observableOf(ePersonUuid),
    );
  }

  beforeEach(waitForAsync(() => {
    init();
  }));

  describe('when the user isn\'t authorized', () => {
    beforeEach(() => {
      authorizedFeatureIds = [];
    });

    it('should not return true', (done: DoneFn) => {
      const result$ = TestBed.runInInjectionContext(() => {
        return guard(undefined, { url: 'current-url' } as any)
      }) as Observable<boolean | UrlTree>;

      result$.subscribe((result) => {
        expect(result).not.toEqual(true);
        done();
      });
    });
  });

  describe('when the user is authorized for at least one of the guard\'s features', () => {
    beforeEach(() => {
      authorizedFeatureIds = [featureIds[0]];
    });

    it('should return true', (done) => {
      const result$ = TestBed.runInInjectionContext(() => {
        return guard(undefined, { url: 'current-url' } as any)
      }) as Observable<boolean | UrlTree>;

      result$.subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
    });
  });

  describe('when the user is authorized for all of the guard\'s features', () => {
    beforeEach(() => {
      authorizedFeatureIds = featureIds;
    });

    it('should return true', (done) => {
      const result$ = TestBed.runInInjectionContext(() => {
        return guard(undefined, { url: 'current-url' } as any)
      }) as Observable<boolean | UrlTree>;

      result$.subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
    });
  });
});
