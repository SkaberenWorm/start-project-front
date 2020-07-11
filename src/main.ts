import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/lib/codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/sql/sql';
import 'codemirror/src/codemirror';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import 'codemirror/mode/css/css';
// import 'codemirror/mode/gfm/gfm';
// import 'codemirror/mode/markdown/markdown';
// import 'codemirror/src/modes';

// import 'codemirror/addon/lint/lint';
// import 'codemirror/addon/lint/json-lint';
// import 'codemirror/addon/lint/css-lint';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
