import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideNoopAnimations(),
    provideFirebaseApp(() => initializeApp({"projectId":"cuc-jtp","appId":"1:145776616225:web:f79279341454697d6d1460","storageBucket":"cuc-jtp.appspot.com","apiKey":"AIzaSyA4juqT5MIKSWiwT2DRP1hzpl4AkdcXiFM","authDomain":"cuc-jtp.firebaseapp.com","messagingSenderId":"145776616225"})), provideFirestore(() => getFirestore())]
};
