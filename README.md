# key-checker

A Library to check if the given KeyboardEvent matches the certain shortcuts

### Install

use `key-checker.js` for JavaScript users,
use `key-checker.ts` for TypeScript users

### Usage

```JavaScript
import checker from "./key-checker";

window.addEventListener("keydown", e => {
  // no extra space needed within shortcut string
  // case insensitive
  checker(e, "Ctrl+A") === checker(e, "ctrl+a");

  // strict match
  checker(e, "ctrl+shift+a"); // => true
  checker(e, "ctrl+a"); // => false

  // multiple shortcut support
  checker(e, ["ctrl+a", "ctrl+s"]);

  // special key support, see docs below
  checker(e, "ctrl+down");
});
```

### Special key list

* modifier: `shift / alt / ctrl / meta`
* arrow key: `up / down / left / right`
* other: `esc / tab / enter / space / delete / backspace`

### Note

* In macOS, `ctrl` and `meta` key are exchanged.  
i.e. `ctrl+a` actually matches `command + a` in macOS

* key `+` not supported because it's a keyword
