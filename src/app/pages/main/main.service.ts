import { Injectable } from '@angular/core';
import { FeedApiService } from '../../common/backend/api/feed-api.service';
import { Subject, Observable } from 'rxjs';
import { FeedModel } from '../../common/models/feed.model';
import { UserProfileModel } from '../../common/models/user-profile.model';

export interface MainData {
    userInfo: UserProfileModel;
    feeds: FeedModel[];
}

@Injectable()
export class MainService {
    private mainDataSubject: Subject<MainData> = new Subject();

    constructor(
        private apiService: FeedApiService
    ) {
    }

    get mainData$(): Observable<MainData> {
        return this.mainDataSubject.asObservable();
    }

    getMainData(userId: string) {
        this.apiService.getMainData(userId).subscribe((result: MainData) => {
            this.mainDataSubject.next(result);
        });
    }
}
