# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Binding > Obj > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { ...x } = '';
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(``, tmpCalleeParam$1, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(``, [], `x`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( "", a, "x" );
$( b );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
