# Preval test case

# test_assign_not_binary.md

> Unwind loops > Separate test > Test assign not binary
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = !counter;
}
`````


## Settled


`````js filename=intro
$(`yolo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`yolo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "yolo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (true) {
  if (test) {
    $(`yolo`);
    counter = counter + 1;
    test = !counter;
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
