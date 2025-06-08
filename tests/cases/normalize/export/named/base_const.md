# Preval test case

# base_const.md

> Normalize > Export > Named > Base const
>
> Exporting declarations

## Input

`````js filename=intro
export const foo = 10;
$(foo);
`````


## Settled


`````js filename=intro
const foo /*:number*/ /*truthy*/ = 10;
export { foo };
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const foo = 10;
export { foo };
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 10;
export { a as foo };
$( 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const foo = 10;
export { foo };
$(foo);
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
