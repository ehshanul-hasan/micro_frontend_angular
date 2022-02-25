import { Injectable } from "@angular/core";
import { ConfigService } from "@ClientApp/shared/app-logger";
import { BaseHttpService, HttpService } from "@ClientApp/shared/http-utility";
import { Constants } from "../shared/constants/constants";

@Injectable()
export class PackageHttpService extends BaseHttpService {

    constructor( private constant: Constants, private configService: ConfigService, httpservice: HttpService ) {
        super(httpservice, `${configService.apiUrl}/${constant.PACKAGE_ENDPOINT}`);

    }
}