# Preval test case

# const_if.md

> Unroll loop with true > Const if
>
>

## Input

`````js filename=intro
if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $('PASS');
} else {
  $('FAIL');
}
`````


## Settled


`````js filename=intro
$(`PASS`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`PASS`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "PASS" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`PASS`);
`````


## Todos triggered


- (todo) this implies a bug and we should prevent it; o


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'PASS'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
