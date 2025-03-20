# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > While > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
while ((a = void arg)) $(100);
$(a, arg);
`````


## Settled


`````js filename=intro
$(undefined, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, 1 );
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
