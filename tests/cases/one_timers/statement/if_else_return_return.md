# Preval test case

# if_else_return_return.md

> One timers > Statement > If else return return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
}
f();
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(0);
  $(2);
} else {
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(0);
  $(2);
} else {
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(0);
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  }
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 0 );
  $( 2 );
}
else {
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
