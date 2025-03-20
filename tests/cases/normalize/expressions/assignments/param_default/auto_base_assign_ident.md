# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Param default > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = b = $(2))) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
$(undefined);
$(b, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
$(undefined);
$(b, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( undefined );
$( a, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: undefined
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
