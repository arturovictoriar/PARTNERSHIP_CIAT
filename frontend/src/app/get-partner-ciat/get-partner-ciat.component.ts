import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-get-partner-ciat',
  templateUrl: './get-partner-ciat.component.html',
  styleUrls: ['./get-partner-ciat.component.scss']
})
export class GetPartnerCiatComponent implements OnInit {

  public partners = null;

  constructor(public http: HttpClient) { 
    this.initialLoad();
  }

  async initialLoad () {
    let url = "http://localhost:5000/partners";
    try {
      this.partners = await this.http.get(url).pipe(map((res) => res)).toPromise();
    } catch (error) {
      console.log(error);
      this.partners = null;
    }
  }

  async removePartner (id) {
    let url = "http://localhost:5000/partners";
    try {
      await this.http.delete(url+"/"+id).pipe(map((res) => res)).toPromise();
      try {
        this.partners = await this.http.get(url).pipe(map((res) => res)).toPromise();
      } catch (error) {
        console.log();
        this.partners = null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  ngOnInit(): void {
  }

}
