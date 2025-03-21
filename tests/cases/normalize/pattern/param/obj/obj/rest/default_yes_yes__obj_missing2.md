# Preval test case

# default_yes_yes__obj_missing2.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj missing2
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const tmpParamBare = { b: 11, c: 12 }
let objPatternBeforeDefault = tmpParamBare.x;
$(objPatternBeforeDefault);
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
$(objPatternBeforeDefault);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
