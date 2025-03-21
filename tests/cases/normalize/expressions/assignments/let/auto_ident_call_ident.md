# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Assignments > Let > Auto ident call ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $(1));
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
$(a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
$(a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
