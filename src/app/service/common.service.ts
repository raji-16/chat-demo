import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";
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
  /**
   * @method: Fetch user query related data
   * @returns
   */
  fetchData() {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:5000");
    return this.httpClient
      .get("http://localhost:5001/api/fetchDownloadedData")
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
