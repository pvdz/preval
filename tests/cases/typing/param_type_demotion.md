# Preval test case

# param_type_demotion.md

> Typing > Param type demotion

The param starts as a number but is then seen as a primitive.
In this test case it ended up as an unknown caused by a bad step in phase1.1

## Options

It's just gonna be a call stack crash. The test is in the typing comment of the output.

- skipEval

## Input

`````js filename=intro
const calling_this_func = function($$0) {
  const theparam = $$0;
  debugger;
  const tmpCalleeParam = theparam + 1;
  if ($(1)) return; // Prevent preval compiling in a throw due to the call stack overflow
  calling_this_func(tmpCalleeParam);
  return undefined;
};
$(calling_this_func(0));

`````

## Settled


`````js filename=intro
const calling_this_func /*:(primitive)=>undefined*/ = function ($$0) {
  const $dlr_$$0 /*:primitive*/ = $$0;
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpCalleeParam /*:primitive*/ = $dlr_$$0 + 1;
    calling_this_func(tmpCalleeParam);
    return undefined;
  }
};
calling_this_func(0);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const calling_this_func = function ($dlr_$$0) {
  const tmpIfTest = $(1);
  if (!tmpIfTest) {
    calling_this_func($dlr_$$0 + 1);
  }
};
calling_this_func(0);
$(undefined);
`````

## Pre Normal


`````js filename=intro
const calling_this_func = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const theparam = $dlr_$$0;
  const tmpCalleeParam = theparam + 1;
  if ($(1)) return;
  calling_this_func(tmpCalleeParam);
  return undefined;
};
$(calling_this_func(0));
`````

## Normalized


`````js filename=intro
const calling_this_func = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const theparam = $dlr_$$0;
  const tmpCalleeParam = theparam + 1;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return undefined;
  } else {
    calling_this_func(tmpCalleeParam);
    return undefined;
  }
};
const tmpCalleeParam$1 = calling_this_func(0);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $( 1 );
  if (c) {
    return undefined;
  }
  else {
    const d = b + 1;
    a( d );
    return undefined;
  }
};
a( 0 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
