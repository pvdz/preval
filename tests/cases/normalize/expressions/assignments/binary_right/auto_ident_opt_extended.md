# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Binary right > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$($(100) + (a = b?.x.y.z));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + 100;
$(tmpCalleeParam);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) + 100);
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a + 100;
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
