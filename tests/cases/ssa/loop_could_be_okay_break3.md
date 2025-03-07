# Preval test case

# loop_could_be_okay_break3.md

> Ssa > Loop could be okay break3
>
> Example of technical case where SSA is possible

- there is a write before any read in the loop
- there is no further read

The conditional break introduces branching which prevents any SSA in the first place.

## Input

`````js filename=intro
let f = function () {
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
};
f();
`````

## Settled


`````js filename=intro
$(1);
let tmpLoopRetCode /*:boolean*/ = true;
const tmpssa2_x /*:unknown*/ = $(2);
$(tmpssa2_x);
if ($) {
} else {
  while ($LOOP_UNROLL_10) {
    const tmpssa2_x$1 /*:unknown*/ = $(2);
    $(tmpssa2_x$1);
    if ($) {
      tmpLoopRetCode = false;
    } else {
    }
    if (tmpLoopRetCode) {
    } else {
      break;
    }
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
let tmpLoopRetCode = true;
$($(2));
if (!$) {
  while (true) {
    $($(2));
    if ($) {
      tmpLoopRetCode = false;
    }
    if (!tmpLoopRetCode) {
      break;
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  while (true) {
    if (tmpLoopRetCode) {
      tmpLoopBody();
    } else {
      break;
    }
  }
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
let a = true;
const b = $( 2 );
$( b );
if ($) {

}
else {
  while ($LOOP_UNROLL_10) {
    const c = $( 2 );
    $( c );
    if ($) {
      a = false;
    }
    if (a) {

    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
