import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';

import { UserProfileModel } from '../../models/user-profile.model';

@Component({
    selector: 'app-gnb',
    templateUrl: './gnb.component.html',
    styleUrls: ['./gnb.component.scss']
})
export class GnbComponent implements OnInit, OnDestroy {
    userProfile: UserProfileModel;

    private subscription: Subscription = new Subscription();

    constructor(
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        // this.subscription = this.authService.userModel$.subscribe((userModel: UserProfileModel) => {
        //     if (userModel.userEmail) {
        //         this.userProfile = userModel;
        //     }
        // });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
