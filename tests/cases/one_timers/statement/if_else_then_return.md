# Preval test case

# if_else_then_return.md

> One timers > Statement > If else then return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
  } else {
    $(2);
  }
  return $(3);
}
f();
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(1);
  $(3);
} else {
  $(2);
  $(3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
  $(3);
} else {
  $(2);
  $(3);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(1);
  } else {
    $(2);
  }
  return $(3);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(1);
  } else {
    $(2);
  }
  const tmpReturnArg = $(3);
  return tmpReturnArg;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  $( 3 );
}
else {
  $( 2 );
  $( 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
