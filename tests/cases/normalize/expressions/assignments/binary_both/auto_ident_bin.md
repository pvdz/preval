# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Binary both > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) + (a = $(1) + $(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs$1 /*:unknown*/ = $(1);
const tmpBinBothRhs$1 /*:unknown*/ = $(2);
const a /*:primitive*/ = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs$3 /*:unknown*/ = $(1);
const tmpBinBothRhs$3 /*:unknown*/ = $(2);
const tmpClusterSSA_a /*:primitive*/ = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1) + $(2);
const tmpClusterSSA_a = $(1) + $(2);
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
const d = $( 1 );
const e = $( 2 );
const f = d + e;
const g = c + f;
$( g );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = a;
const tmpBinBothLhs$3 = $(1);
const tmpBinBothRhs$3 = $(2);
a = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 6
 - 6: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
