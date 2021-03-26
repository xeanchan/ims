import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
/* utility */
import { SpinnerComponent } from './utility/spinner/spinner.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('spinner') spinner: SpinnerComponent;

  constructor(
    public authService: AuthService,
    translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // get last language setting
    if (window.localStorage.getItem('son_ims_language') != null) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang(window.localStorage.getItem('son_ims_language'));

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(window.localStorage.getItem('son_ims_language'));
    } else {
      translate.use('zh-TW');
    }

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.authService.lang = event.lang;
      // TODO This as a workaround.
      this.changeDetectorRef.detectChanges();
      window.localStorage.setItem('son_ims_language', event.lang);
    });
  }

  /** show loading */
  show() {
    this.spinner.show();
  }

  /** hide loading */
  hide() {
    this.spinner.hide();
  }

  /** show loading, 有home link */
  showAsHome() {
    this.spinner.showAsHome();
  }
}
