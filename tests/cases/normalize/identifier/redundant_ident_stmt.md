# Preval test case

# redundant_ident_stmt.md

> Normalize > Identifier > Redundant ident stmt
>
> When an ident statement is also the next "first" expression to be evaluated, the statement is redundant.

The idea is to leave the expression statement with just the identifier to make sure TDZ (and implicit global) errors still trigger if they would have.

However, if the next statement will immediately use them anyways, this is unnecessary.

## Input

`````js filename=intro
function f(...args){ $(...args); }

// Do eliminate
drop1;
drop1();

// Do not eliminate (c may trigger an error first, although it shouldn't matter which var trips it if both do anyways...)
keep1;
c(keep1);

// In this case we can guarantee that `d` is still the first one to trigger an error (because the literal won't).
drop2;
f(1, drop2);

// In this case we can also know that `e` won't trigger an error so the expression statement is still redundant...
let e;
drop3;
f(e, drop3);
`````

## Settled


`````js filename=intro
const f /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const args /*:array*/ = $$0;
  debugger;
  $(...args);
  return undefined;
};
drop1();
c(keep1);
f(1, drop2);
f(undefined, drop3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (args) {
  $(...args);
};
drop1();
c(keep1);
f(1, drop2);
f(undefined, drop3);
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let args = $$0;
  debugger;
  $(...args);
};
drop1;
drop1();
keep1;
c(keep1);
drop2;
f(1, drop2);
let e;
drop3;
f(e, drop3);
`````

## Normalized


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let args = $$0;
  debugger;
  $(...args);
  return undefined;
};
drop1();
c(keep1);
f(1, drop2);
let e = undefined;
f(undefined, drop3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( ...b );
  return undefined;
};
drop1();
c( keep1 );
a( 1, drop2 );
a( undefined, drop3 );
`````

## Globals

BAD@! Found 5 implicit global bindings:

drop1, c, keep1, drop2, drop3

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
