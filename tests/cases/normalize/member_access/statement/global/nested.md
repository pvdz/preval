# Preval test case

# nested.md

> Normalize > Member access > Statement > Global > Nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b;
`````


## Settled


`````js filename=intro
$();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
`````


## PST Settled
With rename=true

`````js filename=intro
$();
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
