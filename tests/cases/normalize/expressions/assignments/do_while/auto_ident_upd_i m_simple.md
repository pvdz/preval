# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b--));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
$(100);
$(0, -1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$(0, -1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( 0, -1 );
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 0, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
