# Preval test case

# early_return5.md

> Normalize > Switch > Early return5
>
> Sorting out the branching stuff

One fewer nesting

## Input

`````js filename=intro
let f = function () {
  const x = 0;
  if (x) {
    $('a')
  } else {
    const y = 1;
    if (y) {
      $('b')
    } else {
      $('c')
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````


## Settled


`````js filename=intro
$(`b`);
$(`after inner`);
$(`after outer`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`b`);
$(`after inner`);
$(`after outer`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "b" );
$( "after inner" );
$( "after outer" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - 2: 'after inner'
 - 3: 'after outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
