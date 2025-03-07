# Preval test case

# loop.md

> If test nested > Loop
>
> When a const is tested twice, the second test is gonna have the same outcome as the first

## Input

`````js filename=intro
const x = $();
if (x) {
  while (true) {
    if (x) {
      $('round and');
    } else {
      break;
    }
  }
}
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $();
if (x) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(`round and`);
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  while (true) {
    $(`round and`);
  }
}
`````

## Pre Normal


`````js filename=intro
const x = $();
if (x) {
  while (true) {
    if (x) {
      $(`round and`);
    } else {
      break;
    }
  }
}
`````

## Normalized


`````js filename=intro
const x = $();
if (x) {
  while (true) {
    if (x) {
      $(`round and`);
    } else {
      break;
    }
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( "round and" );
  }
}
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
