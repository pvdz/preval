# Preval test case

# ref_in_sibling_if_after.md

> Ssa > Ref in sibling if after
>
> What happens if there are future refs but they are in a sibling branch

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  }
  if ($) {
    // This should prevent SSA
    $(x);
  }
}
if ($) f();
`````

## Settled


`````js filename=intro
if ($) {
  $(1);
  if ($) {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    $(tmpClusterSSA_x);
    if ($) {
      $(tmpClusterSSA_x);
    } else {
    }
  } else {
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
  if ($) {
    const tmpClusterSSA_x = $(2);
    $(tmpClusterSSA_x);
    if ($) {
      $(tmpClusterSSA_x);
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  }
  if ($) {
    $(x);
  }
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
    if ($) {
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  if ($) {
    const a = $( 2 );
    $( a );
    if ($) {
      $( a );
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
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
