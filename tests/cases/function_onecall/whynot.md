# Preval test case

# whynot.md

> Function onecall > Whynot
>
> why is this function not inlined?

This one-time caller is only being inlined because of a special "return trampoline" edge case.

The call is immediately returned so we can safely keep all the return statements of the called function when inlining it.

If it weren't for that, it would be blocked from inlining because the func has an early return.

#TODO

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
$(parseIdentifierRest);
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