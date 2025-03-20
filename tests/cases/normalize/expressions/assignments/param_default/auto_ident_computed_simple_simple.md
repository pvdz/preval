# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = b["c"])) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
$(undefined);
const b /*:object*/ = { c: 1 };
$(1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(1, { c: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = { c: 1 };
$( 1, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
