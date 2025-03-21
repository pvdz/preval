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


## PST Settled
With rename=true

`````js filename=intro
f();
`````


## Todos triggered


None


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
