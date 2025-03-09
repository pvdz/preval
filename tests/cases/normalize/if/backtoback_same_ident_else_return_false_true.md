# Preval test case

# backtoback_same_ident_else_return_false_true.md

> Normalize > If > Backtoback same ident else return false true
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

## Input

`````js filename=intro
function f() {
  let x = $(0);
  if (x) {
    x = $(1);
  } else {
  
  }
  if (x) {
    return $(3);
  } else {
    return x;
  }
}
$(f());
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(0);
if (x) {
  const tmpClusterSSA_x /*:unknown*/ = $(1);
  if (tmpClusterSSA_x) {
    const tmpReturnArg /*:unknown*/ = $(3);
    $(tmpReturnArg);
  } else {
    $(tmpClusterSSA_x);
  }
} else {
  $(x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(0);
if (x) {
  const tmpClusterSSA_x = $(1);
  if (tmpClusterSSA_x) {
    $($(3));
  } else {
    $(tmpClusterSSA_x);
  }
} else {
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(0);
  if (x) {
    x = $(1);
  } else {
  }
  if (x) {
    return $(3);
  } else {
    return x;
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(0);
  if (x) {
    x = $(1);
    if (x) {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      return x;
    }
  } else {
    return x;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  const b = $( 1 );
  if (b) {
    const c = $( 3 );
    $( c );
  }
  else {
    $( b );
  }
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
