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
    // q5. main page controller 인 main.service.ts에 subject를 이용하여 main data를 가져올 수 있는 hot observable을 구현하시오.
    // TODO: Write JS code here!'

    constructor(
        private apiService: FeedApiService
    ) {
    }

    getMainData(userId: string) {

    }
}
