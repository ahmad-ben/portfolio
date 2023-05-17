import { provideHttpClient } from "@angular/common/http";
import { importProvidersFrom } from '@angular/core';
import { provideAnalytics } from '@angular/fire/analytics';
import { provideFirebaseApp } from "@angular/fire/app";
import { provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { provideDatabase } from '@angular/fire/database';
import { provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from '@angular/router';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { routes } from './app/app-routing.module';
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";


bootstrapApplication(AppComponent, 
  {providers:
    [
      provideRouter(routes),
      provideHttpClient(),
      importProvidersFrom(
        provideFirebaseApp(() => initializeApp( environment.firebaseConfig )), //=>For Initialize The Firebase Services With The App.
        provideAuth(() => getAuth()), //=>For Firebase Authentication.
        provideAnalytics(() => getAnalytics()), //=>For Firebase Analytics.
        provideDatabase(() => getDatabase()), //=>For Firebase Database.
        provideFirestore(() => getFirestore()), //=>For FireStore.
        AngularFireModule.initializeApp( environment.firebaseConfig ),
      ),
    ],
  }
)

const app = initializeApp(environment.firebaseConfig);


