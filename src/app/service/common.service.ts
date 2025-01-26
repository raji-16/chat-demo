import { Injectable } from "@angular/core";
import { APP_CONSTANTS } from "../shared/constants/app.constant";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  key = APP_CONSTANTS.AUTH.KEY;
  constructor(public httpClient: HttpClient) {}

  setHeaderDetails() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:5000");
    return headers;
  }
  /**
   * @method: Fetch user query related data
   * @returns
   */
  fetchData() {
    //let headers = this.setHeaderDetails();
    return this.httpClient
      .get(
        APP_CONSTANTS.API_CONSTANT.BASE_URL +
          APP_CONSTANTS.API_CONSTANT.FETCH_DOWNLOAD_DATA
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  setFavouriteDetails(request: any) {
    return this.httpClient
      .post(
        APP_CONSTANTS.API_CONSTANT.BASE_URL +
          APP_CONSTANTS.API_CONSTANT.UPDATE_FAVOURITE,
        request
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
