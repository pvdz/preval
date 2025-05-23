# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) + (a = [$(1), 2, $(3)]));
$(a);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpArrElement$5 /*:unknown*/ = $(1);
const tmpArrElement$9 /*:unknown*/ = $(3);
const a /*:array*/ = [tmpArrElement, 2, tmpArrElement$3];
const tmpClusterSSA_a /*:array*/ = [tmpArrElement$5, 2, tmpArrElement$9];
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(1);
const tmpArrElement$9 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$3];
const tmpClusterSSA_a = [tmpArrElement$5, 2, tmpArrElement$9];
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = $( 1 );
const d = $( 3 );
const e = [ a, 2, b ];
const f = [ c, 2, d ];
const g = e + f;
$( g );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpBinBothLhs = a;
const tmpArrElement$5 = $(1);
const tmpArrElement$7 = 2;
const tmpArrElement$9 = $(3);
a = [tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: '1,2,31,2,3'
 - 6: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
