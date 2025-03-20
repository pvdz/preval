# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = --b) || (a = --b));
$(a, b);
`````


## Settled


`````js filename=intro
$(-1);
$(-1, -1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
$(-1, -1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
$( -1, -1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - 2: -1, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
