# Preval test case

# amd_partial_header.md

> Const promotion > Amd partial header
>
> Or what's left of it after partial evaluation.

/*
  // Need to be able to configure this as globals somehow
  // Temp
  ['window', 'undefined'],
  ['self', 'undefined'],
  ['module', 'undefined'],
  ['exports', 'undefined'],
  ['require', 'undefined'],
  ['define', 'undefined'],
  ['global', 'object'],
*/

#TODO

## Input

`````js filename=intro
const g = function () {
  let test1 = false;
  const h = function () {
    if (test1) {
      const p1 = [];
      define(p1, $);
      return undefined;
    } else {
      const result = mainCall();
      global.React = result;
      return undefined;
    }
  };
  if (test1) {
    test1 = define.amd;
    h();
    return undefined;
  } else {
    h();
    return undefined;
  }
};
let test2 = false;
const f = function () {
  if (test2) {
    const result = mainCall();
    module.exports = result;
    return undefined;
  } else {
    g();
    return undefined;
  }
};
if (test2) {
  test2 = false;
  f();
} else {
  f();
}
`````

## Pre Normal

`````js filename=intro
const g = function () {
  debugger;
  let test1 = false;
  const h = function () {
    debugger;
    if (test1) {
      const p1 = [];
      define(p1, $);
      return undefined;
    } else {
      const result = mainCall();
      global.React = result;
      return undefined;
    }
  };
  if (test1) {
    test1 = define.amd;
    h();
    return undefined;
  } else {
    h();
    return undefined;
  }
};
let test2 = false;
const f = function () {
  debugger;
  if (test2) {
    const result$1 = mainCall();
    module.exports = result$1;
    return undefined;
  } else {
    g();
    return undefined;
  }
};
if (test2) {
  test2 = false;
  f();
} else {
  f();
}
`````

## Normalized

`````js filename=intro
const g = function () {
  debugger;
  let test1 = false;
  const h = function () {
    debugger;
    if (test1) {
      const p1 = [];
      define(p1, $);
      return undefined;
    } else {
      const result = mainCall();
      global.React = result;
      return undefined;
    }
  };
  if (test1) {
    test1 = define.amd;
    h();
    return undefined;
  } else {
    h();
    return undefined;
  }
};
let test2 = false;
const f = function () {
  debugger;
  if (test2) {
    const result$1 = mainCall();
    module.exports = result$1;
    return undefined;
  } else {
    g();
    return undefined;
  }
};
if (test2) {
  test2 = false;
  f();
} else {
  f();
}
`````

## Output

`````js filename=intro
const result = mainCall();
global.React = result;
`````

## PST Output

With rename=true

`````js filename=intro
const a = mainCall();
global.React = a;
`````

## Globals

BAD@! Found 1 implicit global bindings:

mainCall

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
