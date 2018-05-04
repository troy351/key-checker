// from https://github.com/vuejs/vue/blob/dev/src/compiler/codegen/events.js#L20
// KeyboardEvent.key aliases
const keyNames = {
  esc: ["Esc", "Escape"],
  tab: "Tab",
  enter: "Enter",
  space: " ",
  up: ["Up", "ArrowUp"],
  left: ["Left", "ArrowLeft"],
  right: ["Right", "ArrowRight"],
  down: ["Down", "ArrowDown"],
  delete: "Delete",
  backspace: "Backspace"
};

const modifierKey = ["shift", "alt", "ctrl", "meta"];
const mac = navigator.userAgent.includes("Macintosh");

export default (e, combos) => {
  if (typeof combos === "string") {
    combos = [combos];
  }

  // special for macOS
  const modifiers = {
    shift: e.shiftKey,
    alt: e.altKey,
    ctrl: mac ? e.metaKey : e.ctrlKey,
    meta: mac ? e.ctrlKey : e.metaKey
  };

  // when key only have on letter, make it lower case,
  // for key will be capitalized when `shift` pressed
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

  for (let i = 0; i < combos.length; i++) {
    // remember to be lower case
    const keys = combos[i].toLowerCase().split("+");

    // there should be exact one non-modifier key, find it
    const normalKeyIndex = keys.findIndex(
      k => typeof modifiers[k] === "undefined"
    );

    const normalKey = keys[normalKeyIndex];
    let found;

    // check if key pairs
    if (keyNames[normalKey]) {
      const names = keyNames[normalKey];
      if (typeof names === "string") {
        found = names === key;
      } else {
        found = names.includes(key);
      }
    } else {
      found = key === normalKey;
    }

    // check if modifier pairs
    // modifiers should be exactly the same
    // e.g. `ctrl+shift+a` could not trigger `ctrl+a`
    found = found && modifierKey.every(m => keys.includes(m) === modifiers[m]);

    if (found) {
      return true;
    }
  }

  return false;
};
