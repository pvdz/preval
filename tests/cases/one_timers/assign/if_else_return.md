# Preval test case

# if_else_return.md

> One timers > Assign > If else return
>
> Return inlining

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

function f() {
  if ($()) {
    $(1);
  } else {
    return $(2);
  }
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
let tmpClusterSSA_x /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(1);
} else {
  const tmpReturnArg /*:unknown*/ = $(2);
  tmpClusterSSA_x = tmpReturnArg;
}
$(tmpClusterSSA_x);
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
let tmpClusterSSA_x = undefined;
if ($()) {
  $(1);
} else {
  tmpClusterSSA_x = $(2);
}
$(tmpClusterSSA_x);
$(tmpClusterSSA_x);
`````

## Pre Normal


`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
let f = function () {
  debugger;
  if ($()) {
    $(1);
  } else {
    return $(2);
  }
};
let x = $(100);
$(closure());
x = f();
$(x);
$(closure());
`````

## Normalized


`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
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
let x = $(100);
const tmpCalleeParam = closure();
$(tmpCalleeParam);
x = f();
$(x);
const tmpCalleeParam$1 = closure();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
let b = undefined;
const c = $();
if (c) {
  $( 1 );
}
else {
  const d = $( 2 );
  b = d;
}
$( b );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
