# Preval test case

# backtoback_same_ident_if_return_false_false.md

> Normalize > If > Backtoback same ident if return false false
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

## Input

`````js filename=intro
function f() {
  let x = $(0);
  if (x) {
  
  } else {
    x = $(0);
  }
  if (x) {
    return x;
  } else {
    return $(3);
  }
}
$(f());
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const x /*:unknown*/ = $(0);
if (x) {
  tmpCalleeParam = x;
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  if (tmpClusterSSA_x) {
    tmpCalleeParam = tmpClusterSSA_x;
  } else {
    const tmpReturnArg /*:unknown*/ = $(3);
    tmpCalleeParam = tmpReturnArg;
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const x = $(0);
if (x) {
  tmpCalleeParam = x;
} else {
  const tmpClusterSSA_x = $(0);
  if (tmpClusterSSA_x) {
    tmpCalleeParam = tmpClusterSSA_x;
  } else {
    tmpCalleeParam = $(3);
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(0);
  if (x) {
  } else {
    x = $(0);
  }
  if (x) {
    return x;
  } else {
    return $(3);
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
    return x;
  } else {
    x = $(0);
    if (x) {
      return x;
    } else {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    }
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 0 );
if (b) {
  a = b;
}
else {
  const c = $( 0 );
  if (c) {
    a = c;
  }
  else {
    const d = $( 3 );
    a = d;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
