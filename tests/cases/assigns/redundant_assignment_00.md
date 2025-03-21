# Preval test case

# redundant_assignment_00.md

> Assigns > Redundant assignment 00
>
> We should eliminate the writes when we know they're redundant

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = 0;
} else {
  x = 0;
}
$(x + $('prevent inlining'));
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(`prevent inlining`);
const tmpCalleeParam /*:primitive*/ = 0 + tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(`prevent inlining`);
$(0 + tmpBinBothRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "prevent inlining" );
const b = 0 + a;
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prevent inlining'
 - 2: '0prevent inlining'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
