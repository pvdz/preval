# Preval test case

# if_else_return.md

> One timers > Var > If else return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
  } else {
    return $(2);
  }
}
const x = f();
$(x);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(1);
} else {
  const tmpReturnArg /*:unknown*/ = $(2);
  x = tmpReturnArg;
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
if ($()) {
  $(1);
} else {
  x = $(2);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(1);
  } else {
    return $(2);
  }
};
const x = f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(1);
    return undefined;
  } else {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
};
const x = f();
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $();
if (b) {
  $( 1 );
}
else {
  const c = $( 2 );
  a = c;
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
