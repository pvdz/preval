# Preval test case

# obj.md

> Normalize > Pattern > Binding > Base alias > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x: a } = 1
`````


## Settled


`````js filename=intro
$Number_prototype.x;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.x;
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.x;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = 1;
const a = tmpBindingPatternObjRoot.x;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
