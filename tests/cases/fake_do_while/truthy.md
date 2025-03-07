# Preval test case

# truthy.md

> Fake do while > Truthy
>
>

## Input

`````js filename=intro
let test = 4;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $('loop');
    test = test - 1;
  } else {
    $('breaking');
    break;
  }
}
$('end');
`````

## Settled


`````js filename=intro
let test /*:number*/ = 4;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`loop`);
  test = test - 1;
  if (test) {
  } else {
    $(`breaking`);
    break;
  }
}
$(`end`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let test = 4;
while (true) {
  $(`loop`);
  test = test - 1;
  if (!test) {
    $(`breaking`);
    break;
  }
}
$(`end`);
`````

## Pre Normal


`````js filename=intro
let test = 4;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $(`loop`);
    test = test - 1;
  } else {
    $(`breaking`);
    break;
  }
}
$(`end`);
`````

## Normalized


`````js filename=intro
let test = 4;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $(`loop`);
    test = test - 1;
  } else {
    $(`breaking`);
    break;
  }
}
$(`end`);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 4;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "loop" );
  a = a - 1;
  if (a) {

  }
  else {
    $( "breaking" );
    break;
  }
}
$( "end" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'loop'
 - 2: 'loop'
 - 3: 'loop'
 - 4: 'loop'
 - 5: 'breaking'
 - 6: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
