# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = 0;
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = (0).x;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$((0).x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
$( a );
`````


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
