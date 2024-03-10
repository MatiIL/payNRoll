import { TestBed } from '@angular/core/testing';

import { EditTeamService } from './edit-team.service';

describe('EditTeamService', () => {
  let service: EditTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
