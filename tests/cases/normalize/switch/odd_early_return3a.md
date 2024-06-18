# Preval test case

# odd_early_return3a.md

> Normalize > Switch > Odd early return3a
>
> Sorting out the branching stuff

Regression was not inlining a single used function.

This version is wrapped in another function.

## Input

`````js filename=intro
function f() {
  const inlineMe = function () {
    $ <= 3;
  };
  const g = function () {
    if ($) {
      inlineMe();
    }
  };
  if (tmpIfTest) {
    g();
  }
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const inlineMe = function () {
    debugger;
    $ <= 3;
  };
  const g = function () {
    debugger;
    if ($) {
      inlineMe();
    }
  };
  if (tmpIfTest) {
    g();
  }
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const inlineMe = function () {
    debugger;
    $ <= 0;
    return undefined;
  };
  const g = function () {
    debugger;
    if ($) {
      inlineMe();
      return undefined;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    g();
    return undefined;
  } else {
    return undefined;
  }
};
$(f);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  if (tmpIfTest) {
    if ($) {
      $ ** 0;
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if (tmpIfTest) {
    if ($) {
      $ ** 0;
      return undefined;
    }
    else {
      return undefined;
    }
  }
  else {
    return undefined;
  }
};
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

tmpIfTest

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
