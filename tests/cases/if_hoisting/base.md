# Preval test case

# base.md

> If hoisting > Base
>
> Trivial case

## Input

`````js filename=intro
let x = 0;
if ($) {
  x = 1;
} else {
  x = 1;
}
$(x);
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
let x = 0;
if ($) {
  x = 1;
} else {
  x = 1;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = 0;
if ($) {
  x = 1;
  $(x);
} else {
  x = 1;
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
