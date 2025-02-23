# Preval test case

# whynot.md

> One timers > Whynot
>
> why is this function not inlined?

## Input

`````js filename=intro
const inlineMe = function () {
  if ($(1)) {
    if ($(1)) {
      return 10;
    }
  } else {
    $(100);
  }
  if ($) {
    return 3;
  } else {
    return 4;
  }
};
const parseIdentifierRest = function () {
  const s = inlineMe();
  return s;
};
$(parseIdentifierRest);
`````

## Pre Normal


`````js filename=intro
const inlineMe = function () {
  debugger;
  if ($(1)) {
    if ($(1)) {
      return 10;
    }
  } else {
    $(100);
  }
  if ($) {
    return 3;
  } else {
    return 4;
  }
};
const parseIdentifierRest = function () {
  debugger;
  const s = inlineMe();
  return s;
};
$(parseIdentifierRest);
`````

## Normalized


`````js filename=intro
const inlineMe = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      return 10;
    } else {
    }
  } else {
    $(100);
  }
  if ($) {
    return 3;
  } else {
    return 4;
  }
};
const parseIdentifierRest = function () {
  debugger;
  const s = inlineMe();
  return s;
};
$(parseIdentifierRest);
`````

## Output


`````js filename=intro
const parseIdentifierRest /*:()=>number*/ = function () {
  debugger;
  let s /*:number*/ = 10;
  $inlinedFunction: {
    const tmpIfTest /*:unknown*/ = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 /*:unknown*/ = $(1);
      if (tmpIfTest$1) {
        break $inlinedFunction;
      } else {
      }
    } else {
      $(100);
    }
    if ($) {
      s = 3;
    } else {
      s = 4;
    }
  }
  return s;
};
$(parseIdentifierRest);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = 10;
  $inlinedFunction: {
    const c = $( 1 );
    if (c) {
      const d = $( 1 );
      if (d) {
        break $inlinedFunction;
      }
    }
    else {
      $( 100 );
    }
    if ($) {
      b = 3;
    }
    else {
      b = 4;
    }
  }
  return b;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
