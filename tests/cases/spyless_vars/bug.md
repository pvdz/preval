# Preval test case

# bug.md

> Spyless vars > Bug
>
>

## Input

`````js filename=intro
let a = 1; const arr = [a]; a = 2; if ($) $(arr);
`````

## Settled


`````js filename=intro
if ($) {
  const arr /*:array*/ = [1];
  $(arr);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $([1]);
}
`````

## Pre Normal


`````js filename=intro
let a = 1;
const arr = [a];
a = 2;
if ($) $(arr);
`````

## Normalized


`````js filename=intro
let a = 1;
const arr = [a];
a = 2;
if ($) {
  $(arr);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = [ 1 ];
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
