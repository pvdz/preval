# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Bindings > Stmt global top > Auto base assign ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = (b = $(2));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
$(b, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
$(b, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
