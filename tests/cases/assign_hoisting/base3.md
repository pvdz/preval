# Preval test case

# base3.md

> Assign hoisting > Base3
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

## Input

`````js filename=intro
let x = $(2);
if ($) {
  $inlinedFunction: {
    if ($) {
      $(`block inlining`);
      $(x);
      break $inlinedFunction;
    } else {
      break $inlinedFunction;
    }
  }
  x = $(3);
} else {
  $(x);
}
$(x);

`````

## Settled


`````js filename=intro
let x /*:unknown*/ = $(2);
if ($) {
  $(`block inlining`);
  $(x);
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(2);
if ($) {
  $(`block inlining`);
  $(x);
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(2);
if ($) {
  $inlinedFunction: {
    if ($) {
      $(`block inlining`);
      $(x);
      break $inlinedFunction;
    } else {
      break $inlinedFunction;
    }
  }
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(2);
if ($) {
  $inlinedFunction: {
    if ($) {
      $(`block inlining`);
      $(x);
      break $inlinedFunction;
    } else {
      break $inlinedFunction;
    }
  }
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
if ($) {
  $( "block inlining" );
  $( a );
  a = $( 3 );
}
else {
  $( a );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 'block inlining'
 - 3: 2
 - 4: 3
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
