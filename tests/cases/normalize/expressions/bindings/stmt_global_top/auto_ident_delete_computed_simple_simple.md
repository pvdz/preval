# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident delete computed simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = delete arg["y"];
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
$(delete arg.y, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = delete arg.y;
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
