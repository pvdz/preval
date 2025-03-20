# Preval test case

# default_no_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Rest > Default no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { ...x } = {};
$(x);
`````


## Settled


`````js filename=intro
const bindingPatternObjRoot /*:object*/ = {};
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(bindingPatternObjRoot, tmpCalleeParam$1, `x`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternObjRoot = {};
$($objPatternRest(bindingPatternObjRoot, [], `x`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [];
const c = $objPatternRest( a, b, "x" );
$( c );
`````


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
