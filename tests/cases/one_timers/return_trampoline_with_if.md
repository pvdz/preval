# Preval test case

# return_trampoline_with_if.md

> One timers > Return trampoline with if
>
> why is this function not inlined?

This one-time caller is only being inlined because of a special "return trampoline" edge case.

The call is immediately returned so we can safely keep all the return statements of the called function when inlining it.

If it weren't for that, it would be blocked from inlining because the func has an early return.

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
  const s$15 = inlineMe(c$53);
  return s$15;
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
  const s$15 = inlineMe(c$53);
  return s$15;
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
  const s$15 = inlineMe(c$53);
  return s$15;
};
$(parseIdentifierRest);
`````

## Output


`````js filename=intro
const parseIdentifierRest = function () {
  debugger;
  c$53;
  let s$15 = 10;
  $inlinedFunction: {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        break $inlinedFunction;
      } else {
      }
    } else {
      $(100);
    }
    if ($) {
      s$15 = 3;
    } else {
      s$15 = 4;
    }
  }
  return s$15;
};
$(parseIdentifierRest);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  c$53;
  let b = 10;
  $inlinedFunction:   {
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

BAD@! Found 1 implicit global bindings:

c$53

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
