import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { BookState } from './shared/states/books-state/book.state';
import { provideHttpClient} from '@angular/common/http';
import { BookDialogState } from './shared/states/book-state-dialog/book-dialog.state';
import { SaveBookState } from './shared/states/save-book-state-dialog/save-book-dialog.state';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsModule.forRoot([BookState, BookDialogState, SaveBookState])
    ),    
    provideHttpClient(),  
    provideAnimations(),
    provideToastr()
  ],
};
