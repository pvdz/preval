# Preval test case

# tail.md

> Labels > Tail
>
> Regression where break to label was eliminated because
> it was the tail position all the way back to its loop.
> But it forgot that loops would break that transform. Uups.

## Input

`````js filename=intro
$(`start`);
$continue: {
  while (true) {
    $(`inner`);
    break $continue;
  }
}
$('end');
`````


## Settled


`````js filename=intro
$(`start`);
$(`inner`);
$(`end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`start`);
$(`inner`);
$(`end`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "start" );
$( "inner" );
$( "end" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`start`);
$(`inner`);
$(`end`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'start'
 - 2: 'inner'
 - 3: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
