# Preval test case

# default_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = { x: 'abc' };
$(x);
`````


## Settled


`````js filename=intro
$(`abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = { x: `abc` };
const x = tmpBindingPatternObjRoot.x;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
