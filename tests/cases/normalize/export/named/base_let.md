# Preval test case

# base_let.md

> Normalize > Export > Named > Base let
>
> Exporting declarations

## Input

`````js filename=intro
export let foo = 10;
$(foo);
`````


## Settled


`````js filename=intro
const foo /*:number*/ = 10;
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
