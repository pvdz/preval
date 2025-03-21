# Preval test case

# falsy.md

> Fake do while > Falsy
>
>

## Input

`````js filename=intro
let test = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $('breaking');
    break;
  } else {
    $('loop');
    test = test + 1;
  } 
}
$('end');
`````


## Settled


`````js filename=intro
let test /*:number*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`loop`);
  test = test + 1;
  if (test) {
    $(`breaking`);
    break;
  } else {
  }
}
$(`end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let test = 0;
while (true) {
  $(`loop`);
  test = test + 1;
  if (test) {
    $(`breaking`);
    break;
  }
}
$(`end`);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "loop" );
  a = a + 1;
  if (a) {
    $( "breaking" );
    break;
  }
}
$( "end" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'loop'
 - 2: 'breaking'
 - 3: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
