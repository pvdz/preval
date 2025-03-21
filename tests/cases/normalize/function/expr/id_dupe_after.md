# Preval test case

# id_dupe_after.md

> Normalize > Function > Expr > Id dupe after
>
> Function expression ids should be eliminated

## Input

`````js filename=intro
const f = function g() {
  $(typeof g);
};
const g = 10;
$(g, f());
`````


## Settled


`````js filename=intro
$(`function`);
$(10, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function`);
$(10, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function" );
$( 10, undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function'
 - 2: 10, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
