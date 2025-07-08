# Preval test case

# testing_different_test_ops.md

> Unwind loops > Separate test > Testing different test ops
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = counter >= 0;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
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
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 0;
let test = counter >= 0;
while (true) {
  if (test) {
    $(`yolo`);
    counter = counter + 1;
    test = counter < 10;
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
