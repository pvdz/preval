# Preval test case

# early_return_outside.md

> Ssa > Single scope > Early return outside
>
> Figure out why the early returns are not allowing the var to be SSA'd

This variant will have an early return but in a parent branch

## Input

`````js filename=intro
const tmpLabeledBlockFunc$3 = function (x) {
  if ($(1)) {
    if ($) {
      // SSA this
      x = $(1);
      $(x);
    } else {
      $(2);
    }
    // This return still makes the last ref to x fine. SSA is not blocked
    return;
  } else {
    $(3);
  }
  $(x);
};
$(tmpLabeledBlockFunc$3);
`````

## Settled


`````js filename=intro
const tmpLabeledBlockFunc$3 /*:(unknown)=>undefined*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    if ($) {
      const tmpClusterSSA_x /*:unknown*/ = $(1);
      $(tmpClusterSSA_x);
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  } else {
    $(3);
    $(x);
    return undefined;
  }
};
$(tmpLabeledBlockFunc$3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  if ($(1)) {
    if ($) {
      $($(1));
    } else {
      $(2);
    }
  } else {
    $(3);
    $(x);
  }
});
`````

## Pre Normal


`````js filename=intro
const tmpLabeledBlockFunc$3 = function ($$0) {
  let x = $$0;
  debugger;
  if ($(1)) {
    if ($) {
      x = $(1);
      $(x);
    } else {
      $(2);
    }
    return;
  } else {
    $(3);
  }
  $(x);
};
$(tmpLabeledBlockFunc$3);
`````

## Normalized


`````js filename=intro
const tmpLabeledBlockFunc$3 = function ($$0) {
  let x = $$0;
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    if ($) {
      x = $(1);
      $(x);
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  } else {
    $(3);
    $(x);
    return undefined;
  }
};
$(tmpLabeledBlockFunc$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $( 1 );
  if (c) {
    if ($) {
      const d = $( 1 );
      $( d );
      return undefined;
    }
    else {
      $( 2 );
      return undefined;
    }
  }
  else {
    $( 3 );
    $( b );
    return undefined;
  }
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
