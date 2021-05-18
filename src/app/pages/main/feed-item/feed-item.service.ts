import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ReplyModel } from '../../../common/models/reply.model';
import { FeedApiService } from '../../../common/backend/api/feed-api.service';
import { Reply } from '../../../common/backend/models/reply';

@Injectable()
export class FeedItemService {
    private replyListSubject: Subject<ReplyModel[]> = new Subject();

    constructor(
        private apiService: FeedApiService
    ) {
    }

    get replyList$(): Observable<ReplyModel[]> {
        return this.replyListSubject.asObservable();
    }

    addReply(reply: any) {
        this.apiService.addReply(reply).subscribe((result: ReplyModel[]) => {
            this.replyListSubject.next(result);
        });
    }
}
