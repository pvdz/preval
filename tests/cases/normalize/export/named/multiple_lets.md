# Preval test case

# multiple_lets.md

> Normalize > Export > Named > Multiple lets
>
> Exporting declarations

## Input

`````js filename=intro
export let a = 10, b = 20;
`````


## Settled


`````js filename=intro
const a /*:number*/ /*truthy*/ = 10;
const b /*:number*/ /*truthy*/ = 20;
export { a, b };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 10;
const b = 20;
export { a, b };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 10;
const b = 20;
export { a as a,b as b };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 10;
let b = 20;
export { a, b };
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
