import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-set-partner-ciat',
  templateUrl: './set-partner-ciat.component.html',
  styleUrls: ['./set-partner-ciat.component.scss']
})
export class SetPartnerCiatComponent implements OnInit {
  public registerForm: any;
  public invalid_form: any;
  public countries: any;
  public error: any;
  public placeholderText = {
    headquarter: "Headquarter",
    acronym: "Acronym",
    name: "Name",
    type: "Type",
    country: "Country",
    city: "City",
    partnerUrl: "Partner URL"
  };
  public isBrand = false;
  public partners = null;


  constructor(
    private fb: FormBuilder,
    public http: HttpClient) {
    this.registerForm = this.fb.group({
      headquarter: [null, []],
      acronym: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      partnerUrl: [null, []]
    });
    this.invalid_form = false;
    this.error = false;
  }

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.invalid_form = true;
      return;
    }
    this.invalid_form = false;
    let formValues = this.registerForm.value;
    console.log(formValues);
    let host = "http://localhost:5000"
    let url = host + "/partners";
    let data = {
      "acronym": formValues.acronym,
      "name": formValues.name,
      "country": formValues.country,
      "type": formValues.type,
      "city": formValues.city,
      "partner_url": formValues.partnerUrl,
      "headquarter": this.isBrand ? "no" : "yes",
    };
    let result = await this.http.post(url, data).pipe(map((res) => res)).toPromise();
    console.log(result);
  }

  async showHeadquarter(show, event) {
    event.preventDefault();
    this.isBrand = show ? true : false;
    if (this.isBrand) {
      let url = "http://localhost:5000/partners";
      try {
        this.partners = await this.http.get(url).pipe(map((res) => res)).toPromise();
      } catch (error) {
        console.log(error);
        this.partners = null;
      }
    }
  }

}
