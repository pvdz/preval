# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Binding > Obj > Rest > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { ...x } = 0;
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
const x /*:unknown*/ = $objPatternRest(0, tmpCalleeParam$1, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(0, [], `x`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( 0, a, "x" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = 0;
let tmpCalleeParam = tmpBindingPatternObjRoot;
let tmpCalleeParam$1 = [];
const x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
$(x);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


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
