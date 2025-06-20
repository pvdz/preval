# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident logic and simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = 1 && 2;
$(a);
`````


## Settled


`````js filename=intro
const a /*:number*/ /*truthy*/ = 2;
export { a };
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 2;
export { a };
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 2;
export { a as a };
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
if (a) {
  a = 2;
} else {
}
export { a };
$(a);
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
