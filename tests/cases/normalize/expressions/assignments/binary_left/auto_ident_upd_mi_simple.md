# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = --b) + $(100));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = 0 + tmpBinBothRhs;
$(tmpCalleeParam);
$(0, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(100);
$(0 + tmpBinBothRhs);
$(0, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = 0 + a;
$( b );
$( 0, 0 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
