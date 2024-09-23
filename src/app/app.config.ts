import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

//?Firebase Authentication
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyD9iOft13nwOg7gQUQ5eMoCiTn466T73U0",
  authDomain: "sscgame-6bf5b.firebaseapp.com",
  projectId: "sscgame-6bf5b",
  storageBucket: "sscgame-6bf5b.appspot.com",
  messagingSenderId: "899396534388",
  appId: "1:899396534388:web:a69fb0ea43541dc3511121"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseConfig),
      HttpClientModule,
      AngularFirestoreModule
    )
  ]
};
