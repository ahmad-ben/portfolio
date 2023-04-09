import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from '@angular/router';
import { initializeApp } from "firebase/app";
import { routes } from './app/app-routing.module';
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";

bootstrapApplication(AppComponent, {providers:[provideRouter(routes)]})

const app = initializeApp(environment.firebaseConfig);

