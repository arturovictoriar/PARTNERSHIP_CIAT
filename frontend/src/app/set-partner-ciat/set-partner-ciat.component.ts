import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import isoCountries from '../../assets/en.json';

@Component({
  selector: 'app-set-partner-ciat',
  templateUrl: './set-partner-ciat.component.html',
  styleUrls: ['./set-partner-ciat.component.scss']
})
export class SetPartnerCiatComponent implements OnInit {
  public registerForm: any;
  public invalid_form: any;
  public invalid_name: any;
  public countries: any;
  public error: any;
  public placeholderText = {
    headquarter: "Headquarter*",
    acronym: "Acronym",
    name: "Name*",
    type: "Type*",
    country: "Country*",
    city: "City*",
    partnerUrl: "If you know the partner website please copy the link here"
  };
  public warningText = {
    headquarter: "Choose a headquarter",
    acronym: "Must be less than 10 characters",
    name: "Can not be empty. Must be less than 10 words",
    type: "Choose a type",
    country: "Choose a country",
    city: "Can not be empty. Type a city",
    partnerUrl: "Must be http: or https:"
  }
  public isBrand = false;
  public partners = null;
  public typePartner = [
    "Academic Institutions",
    "Donor",
    "No-Governmental Organization",
    "Research Institution"
  ];
  public countries3166 = isoCountries;

  constructor(
    private fb: FormBuilder,
    public http: HttpClient,
    private router: Router,
    private cdref: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      headquarter: [null, []],
      acronym: [null, [Validators.maxLength(9)]],
      name: [null, [Validators.required, Validators.pattern(/^(?:\b\w+\b[\s\r\n]*){1,9}$/)]],
      type: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      partnerUrl: [null, [Validators.pattern(/^(http|https):.*/)]]
    });
    this.invalid_form = false;
    this.error = false;
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  get f() {
    return this.registerForm.controls;
  }

  validUniqueCityCountry (formValues, partner) {
    if (partner.city === formValues.city || partner.country === formValues.country) {
      return(false);
    }
    return(true);
  }

  async validUniqueName(formValues) {
    let url = "http://localhost:5000/partners";
    let allPartners = null;
    try {
      allPartners = await this.http.get(url).pipe(map((res) => res)).toPromise();
    } catch (error) {
      return(false);
    }
    for (let partner of allPartners) {
      if (partner.name === formValues.name || partner.acronym === formValues.acronym) {
        if (this.isBrand && this.validUniqueCityCountry(formValues, partner)) {
          console.log("sali por aca")
          return(true);
        }
        return(false);
      }
    }
    console.log("sali")
    return(true);
  }

  async onSubmit() {
    let formValues = this.registerForm.value;
    if (!(await this.validUniqueName(formValues))) {
      this.invalid_name = true;
      return;
    }
    if (this.registerForm.invalid || (formValues.headquarter === null && this.isBrand)) {
      this.invalid_form = true;
      return;
    }
    this.invalid_form = false;
    this.invalid_name = false;
    let host = "http://localhost:5000"
    let url = host + "/partners";
    let data = {
      "acronym": formValues.acronym ? formValues.acronym : "",
      "name": formValues.name,
      "country": formValues.country,
      "type": formValues.type,
      "city": formValues.city,
      "partner_url": formValues.partnerUrl ? formValues.partnerUrl : "",
      "headquarter": this.isBrand ? "NO" : "YES",
    };
    let result = await this.http.post(url, data).pipe(map((res) => res)).toPromise();
    this.router.navigate(['partners']);
  }

  async showHeadquarter(show, event) {
    event.preventDefault();
    this.isBrand = show ? true : false;
    if (this.isBrand) {
      this.registerForm.controls["headquarter"].setValidators(Validators.required);
      let url = "http://localhost:5000/partners";
      let allPartners = null;
      try {
        allPartners = await this.http.get(url).pipe(map((res) => res)).toPromise();
        this.partners = allPartners.filter((obj) => obj.headquarter === "yes")
      } catch (error) {
        this.partners = null;
      }
    } else {
      this.registerForm.controls["headquarter"].clearValidators()
    }
  }

  cancelEvent(event) {
    event.preventDefault();
  }

}
