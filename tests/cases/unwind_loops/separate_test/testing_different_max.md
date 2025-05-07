# Preval test case

# testing_different_max.md

> Unwind loops > Separate test > Testing different max
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 20;
}
`````


## Settled


`````js filename=intro
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
let tmpClusterSSA_counter$2 /*:number*/ = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`yolo`);
  tmpClusterSSA_counter$2 = tmpClusterSSA_counter$2 + 1;
  const test$1 /*:boolean*/ = tmpClusterSSA_counter$2 < 20;
  if (test$1) {
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
$(`yolo`);
let tmpClusterSSA_counter$2 = 11;
while (true) {
  $(`yolo`);
  tmpClusterSSA_counter$2 = tmpClusterSSA_counter$2 + 1;
  if (!(tmpClusterSSA_counter$2 < 20)) {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
$( "yolo" );
let a = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "yolo" );
  a = a + 1;
  const b = a < 20;
  if (b) {

  }
  else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'yolo'
 - 2: 'yolo'
 - 3: 'yolo'
 - 4: 'yolo'
 - 5: 'yolo'
 - 6: 'yolo'
 - 7: 'yolo'
 - 8: 'yolo'
 - 9: 'yolo'
 - 10: 'yolo'
 - 11: 'yolo'
 - 12: 'yolo'
 - 13: 'yolo'
 - 14: 'yolo'
 - 15: 'yolo'
 - 16: 'yolo'
 - 17: 'yolo'
 - 18: 'yolo'
 - 19: 'yolo'
 - 20: 'yolo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
