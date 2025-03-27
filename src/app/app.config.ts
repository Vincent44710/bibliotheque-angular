import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { BookState } from './shared/states/books-state/book.state';
import { provideHttpClient} from '@angular/common/http';
import { BookDialogState } from './shared/states/book-state-dialog/book-dialog.state';
import { CreateBookState } from './shared/states/create-book-state-dialog/create-book-dialog.state';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsModule.forRoot([BookState, BookDialogState, CreateBookState])
    ),    
    provideHttpClient(),  
    provideAnimations(),
    provideToastr()
  ],
};
