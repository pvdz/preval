# Preval test case

# base2.md

> Assign hoisting > Base2
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

## Input

`````js filename=intro
let x = undefined;
if ($) {
  x = $(3); // Change x
} else {
  $(x); // Observe x
}
$(x);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
if ($) {
  x = $(3);
} else {
  $(undefined);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
if ($) {
  x = $(3);
} else {
  $(undefined);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($) {
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
if ($) {
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
if ($) {
  a = $( 3 );
}
else {
  $( undefined );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
