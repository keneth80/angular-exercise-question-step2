import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../services/base.service';


// 설정 정보를 가져오는 함수 및 글로벌 데이터를 저장하는 service
@Injectable({
    providedIn: 'root'
})
export class GlobalVariableService {
    remoteUrl = '';

    constructor(
        private http: HttpClient
    ) {
    }

    // TODO: question http client를 사용하여 assets/config/configuration.json 파일을 로드하여 저장할 것.
    // 단, return type 은 Promise여야 함.
    getConfiguration(): Promise<any> {
        return this.http.get('assets/config/configuration.json')
            .toPromise()
            .then((res: any) => {
                if (console && console.log) {
                    console.log('configuration : ', res);
                }
                this.remoteUrl = res.remote;
                return res;
            });
    }

}
