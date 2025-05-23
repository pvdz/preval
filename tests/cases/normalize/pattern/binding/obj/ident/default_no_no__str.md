# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = 'abc';
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $String_prototype.x;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($String_prototype.x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = `abc`;
const x = tmpBindingPatternObjRoot.x;
$(x);
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
