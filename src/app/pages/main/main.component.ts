import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../common/services/authentication/authentication.service';
import { UserProfileModel } from '../../common/models/user-profile.model';
import { Subscription } from 'rxjs';
import { MainService, MainData } from './main.service';
import { FeedModel } from '../../common/models/feed.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    providers: [
        MainService
    ],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
    userProfile: UserProfileModel;

    feeds: FeedModel[] = [];

    private subscription: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        private mainService: MainService
    ) { }

    ngOnInit(): void {
        // q2. user정보가 없다면 login 화면으로 이동하도록 완성 하시오.
        // TODO: Write JS code here!'
        // userId가 없다면 login page로 이동.

        // this.subscription.add(
        //     this.mainService.mainData$.subscribe((mainData: MainData) => {
        //         this.userProfile = mainData.userInfo;
        //         this.feeds = mainData.feeds;
        //     })
        // );

        // this.mainService.getMainData(userId);
    }

    onPageChange(currentPage: number): void {
        console.log('onPageChange : ', currentPage);
    }
}
