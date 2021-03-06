import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, concatMap } from 'rxjs/operators';

import { BaseService } from '../../services/base.service';
import { GlobalVariableService } from '../../services/application/global-variable.service';
import { BackendResponse } from '../models/backend-response';
import { User } from '../models/user';
import { UserProfileModel } from '../../models/user-profile.model';
import { userMapperForUserProfile, feedMapperForFeedModel, replyMapperForReplyModel } from '../../mappers';
import { throwError, Observable, forkJoin } from 'rxjs';
import { UserParam } from '../../models/params/user-param';
import { Feed } from '../models/feed';
import { FeedModel } from '../../models/feed.model';
import { Reply } from '../models/reply';
import { ReplyModel } from '../../models/reply.model';

// backend api가 정의되는 service
@Injectable({
    providedIn: 'root'
})
export class FeedApiService extends BaseService {
    private PRE_FIX = '/api';

    constructor(
        private http: HttpClient,
        private globalVariableService: GlobalVariableService
    ) {
        super();
    }

    login(email: string, password: string): Observable<UserProfileModel> {
        const url = `${this.globalVariableService.remoteUrl}${this.PRE_FIX}/authenticate`;
        return this.http.post<BackendResponse<User>>(url, { email, password })
            .pipe(
                map((response: BackendResponse<User>) => {
                    return userMapperForUserProfile(response.data);
                })
            );
    }

    enter(param: UserParam) {
        const url = `${this.globalVariableService.remoteUrl}${this.PRE_FIX}/register`;
        return this.http.post<BackendResponse<any>>(url, param);
    }

    getFeedList(userNickName: string): Observable<FeedModel[]> {
        const url = `${this.globalVariableService.remoteUrl}${this.PRE_FIX}/feeds/${userNickName}`;
        return this.http.get<BackendResponse<Array<Feed>>>(url)
            .pipe(
                map((response: BackendResponse<Array<Feed>>) => {
                    const feeds: FeedModel[] = [];
                    if (response.data && response.data.length) {
                        for (const feed of response.data) {
                            feeds.push(
                                feedMapperForFeedModel(feed)
                            );
                        }
                    }
                    return feeds;
                })
            );
    }

    // TODO: Write JS code here!'
    // q4. http 모듈을 이용하여 user 정보를 호출하는 api를 feed-api.service.ts에 완성하시오.
    getUserInfo(userNickName: string): Observable<any> {
        const url = `${this.globalVariableService.remoteUrl}${this.PRE_FIX}`;
        return this.http.get<BackendResponse<User>>(url);
    }

    getMainData(userNickName: string): Observable<{
        userInfo: any,
        feeds: any
    }> {
        return forkJoin({
            userInfo: this.getUserInfo(userNickName),
            feeds: this.getFeedList(userNickName)
        });
    }

    // reply 정보를 추가하고 갱신 된 리스트를 가져오기 위함.
    addReply(reply: Reply): Observable<ReplyModel[]> {
        const addUrl = `${this.globalVariableService.remoteUrl}${this.PRE_FIX}/reply`;
        return this.http.post<BackendResponse>(addUrl, reply)
            .pipe(
                concatMap((response: BackendResponse) =>
                    this.http.get<BackendResponse<Reply[]>>(`${this.globalVariableService.remoteUrl}${this.PRE_FIX}/reply/${reply.feedId}`)
                ),
                map((response: BackendResponse<Reply[]>) => {
                    const replyNodels: ReplyModel[] = [];
                    if (response.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            replyNodels.push(
                                replyMapperForReplyModel(response.data[i])
                            );
                        }
                    }
                    return replyNodels;
                })
            );
    }
}
