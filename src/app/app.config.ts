import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from "@abacritt/angularx-social-login";
import { AuthGuardService } from "./service/auth.service";
import {
  HttpClient,
  HttpHandler,
  provideHttpClient,
} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom([BrowserAnimationsModule]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    AuthGuardService,
    provideHttpClient(),
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "57712145460-l6tt6nos7tas43687lvtk6ommlb3vjmf.apps.googleusercontent.com",
              {
                oneTapEnabled: false, // <===== default is true
              }
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
};
