import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { FeedModel } from '../../../common/models/feed.model';
import { FeedItemService } from './feed-item.service';
import { AuthenticationService } from '../../../common/services/authentication/authentication.service';
import { UserProfileModel } from '../../../common/models/user-profile.model';
import { Router } from '@angular/router';
import { ReplyModel } from '../../../common/models/reply.model';
import { Subscription } from 'rxjs';
import { GO_LOGIN_MESSAGE } from '../../../common/const';

@Component({
    selector: 'app-feed-item',
    templateUrl: './feed-item.component.html',
    styleUrls: ['./feed-item.component.scss'],
    providers: [
        FeedItemService,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class FeedItemComponent implements OnInit, OnDestroy {
    @Input() feed: FeedModel;

    // ngmodel과 2way binding
    // FormsModule이 임포트가 되어야 한다.
    replyContent = '';

    // 객체의 특정 값의 변경에 따라 템플릿을 적용해야할 경우에는 따로 변수를 선언하는게 낫다.
    feedLike = 0;

    private userProfile: UserProfileModel;

    private subscription: Subscription = new Subscription();

    constructor(
        private router: Router,
        private feedItemService: FeedItemService,
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.feedLike = this.feed.like || 0;
        this.subscription.add(
            this.feedItemService.replyList$.subscribe((replys: ReplyModel[]) => {
                this.replyContent = '';
                this.feed.reply = replys;
            })
        );

        // login 여부 체크
        this.subscription.add(
            this.authService.userModel$.subscribe((profile: UserProfileModel) => {
                if (profile.userEmail) {
                    this.userProfile = profile;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onRegisterReply(): void {
        if (!this.replyContent.length) {
            return;
        }

        if (!this.loginCheck()) {
            return;
        }

        this.feedItemService.addReply({
            id: 0,
            content: this.replyContent,
            userId: this.userProfile.id,
            userNickName: this.userProfile.userNickName,
            feedId: this.feed.id,
            created: new Date().getTime()
        });
    }

    onLike(): void {
        if (!this.loginCheck()) {
            return;
        }

        if (this.userProfile.likeFeeds) {
            const likeIndex = this.userProfile.likeFeeds.findIndex((like: string) => +like === this.feed.id);
            if (likeIndex < 0) {
                this.userProfile.likeFeeds.push(this.feed.id + '');
                this.feedLike++;
            } else {
                this.userProfile.likeFeeds.splice(likeIndex, 1);
                this.feedLike--;
            }
        }
    }

    private loginCheck(): boolean {
        if (!this.userProfile) {
            // login 상태가 아니므로 로그인 화면으로 보낸다.
            alert(GO_LOGIN_MESSAGE);
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
            return false;
        } else {
            return true;
        }
    }
}
