# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident c-opt simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = b?.["x"]));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + 1;
$(tmpCalleeParam);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) + 1);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a + 1;
$( b );
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 101
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
