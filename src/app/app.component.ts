import { Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
//import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs";  
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  bio: any;
  constructor(
    private swUpdate: SwUpdate,
    public firestore: AngularFirestore
    ) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
    this.getBio();
  }

  getBio(){
    this.firestore.collection('bio').valueChanges().subscribe(res =>{
      this.bio = res;
      console.log(res)
    });
  }
}
