import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"sscgame-6bf5b","appId":"1:899396534388:web:a69fb0ea43541dc3511121","storageBucket":"sscgame-6bf5b.appspot.com","apiKey":"AIzaSyD9iOft13nwOg7gQUQ5eMoCiTn466T73U0","authDomain":"sscgame-6bf5b.firebaseapp.com","messagingSenderId":"899396534388"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
