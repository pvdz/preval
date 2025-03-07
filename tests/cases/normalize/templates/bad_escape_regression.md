# Preval test case

# bad_escape_regression.md

> Normalize > Templates > Bad escape regression
>
> This was from Tenko and a uncovered a problem (since obviously the input code only escapes a backslash)

The point of this test was that the `\\8` got transformed to a template with `\8` (missing a backslash) which led to an invalid escape and the parser was throwing (correctly) for it.

## Input

`````js filename=intro
function parseDecimalEscape(c) {
  let reason = 'Cannot escape \\8 or \\9 in a regex char class with u-flag';
  if (webCompat === true) {
    updateRegexUflagIsIllegal(0, reason);
    return c | 16777216;
  }
  regexSyntaxError(reason);
  return 0x110000;
}
f();
`````

## Settled


`````js filename=intro
f();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
f();
`````

## Pre Normal


`````js filename=intro
let parseDecimalEscape = function ($$0) {
  let c = $$0;
  debugger;
  let reason = `Cannot escape \\8 or \\9 in a regex char class with u-flag`;
  if (webCompat === true) {
    updateRegexUflagIsIllegal(0, reason);
    return c | 16777216;
  }
  regexSyntaxError(reason);
  return 1114112;
};
f();
`````

## Normalized


`````js filename=intro
let parseDecimalEscape = function ($$0) {
  let c = $$0;
  debugger;
  let reason = `Cannot escape \\8 or \\9 in a regex char class with u-flag`;
  const tmpIfTest = webCompat === true;
  if (tmpIfTest) {
    updateRegexUflagIsIllegal(0, reason);
    const tmpReturnArg = c | 16777216;
    return tmpReturnArg;
  } else {
    regexSyntaxError(reason);
    return 1114112;
  }
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
f();
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
