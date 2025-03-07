# Preval test case

# ref_in_sibling_else_after.md

> Ssa > Ref in sibling else after
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
    $('if');
  } else {
    // This should prevent SSA
    $(x);
  }
}
if ($) f();
`````

## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(1);
  if ($) {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    $(tmpClusterSSA_x);
    if ($) {
      $(`if`);
    } else {
      $(tmpClusterSSA_x);
    }
  } else {
    $(x);
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(1);
  if ($) {
    const tmpClusterSSA_x = $(2);
    $(tmpClusterSSA_x);
    if ($) {
      $(`if`);
    } else {
      $(tmpClusterSSA_x);
    }
  } else {
    $(x);
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
    $(`if`);
  } else {
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
      $(`if`);
      return undefined;
    } else {
      $(x);
      return undefined;
    }
  } else {
    $(x);
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
  const a = $( 1 );
  if ($) {
    const b = $( 2 );
    $( b );
    if ($) {
      $( "if" );
    }
    else {
      $( b );
    }
  }
  else {
    $( a );
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
 - 4: 'if'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
