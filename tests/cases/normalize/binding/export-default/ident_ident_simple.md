# Preval test case

# ident_ident_simple.md

> Normalize > Binding > Export-default > Ident ident simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = b = c;
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:number*/ /*truthy*/ = 3;
export { b as a };
$(3, 3, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = 3;
export { b as a };
$(3, 3, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 3;
export { a as a };
$( 3, 3, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 2;
let c = 3;
b = c;
let a = b;
export { a };
$(a, b, c);
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
