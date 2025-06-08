# Preval test case

# ident_ident_bin.md

> Normalize > Binding > Export-default > Ident ident bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
export let a = b = c + d;
$(a, b, c);
`````


## Settled


`````js filename=intro
const a /*:number*/ /*truthy*/ = 7;
export { a };
$(7, 7, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 7;
export { a };
$(7, 7, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 7;
export { a as a };
$( 7, 7, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 2;
let c = 3;
let d = 4;
b = c + d;
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
