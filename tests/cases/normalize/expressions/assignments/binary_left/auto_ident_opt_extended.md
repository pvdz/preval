# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Binary left > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$((a = b?.x.y.z) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = 100 + tmpBinBothRhs;
$(tmpCalleeParam);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(100);
$(100 + tmpBinBothRhs);
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = 100 + a;
$( b );
$( 100 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
