# Preval test case

# block_elim_regression.md

> Labels > Block elim regression
>
> This case was ending with A being initialized to "oops" rather than keeping the call to "mefirst"

## Input

`````js filename=intro
let A = $('mefirst');
loopStop: {
  A = `oops`;
  break loopStop;
}
$(A);
`````


## Settled


`````js filename=intro
$(`mefirst`);
$(`oops`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`mefirst`);
$(`oops`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "mefirst" );
$( "oops" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'mefirst'
 - 2: 'oops'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
