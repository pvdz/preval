# Preval test case

# falsy_base.md

> Fake do while > Falsy base
>
>

## Input

`````js filename=intro
let test = false;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    break;
  } else {
    $();
    test = true;
  }
}
`````

## Settled


`````js filename=intro
$();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
`````

## Pre Normal


`````js filename=intro
let test = false;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    break;
  } else {
    $();
    test = true;
  }
}
`````

## Normalized


`````js filename=intro
let test = false;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    break;
  } else {
    $();
    test = true;
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
$();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
