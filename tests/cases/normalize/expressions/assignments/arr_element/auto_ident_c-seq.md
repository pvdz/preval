# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), $(x))) + (a = ($(1), $(2), $(x))));
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = $(1);
$(1);
$(2);
const tmpClusterSSA_a /*:unknown*/ = $(1);
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const a = $(1);
$(1);
$(2);
const tmpClusterSSA_a = $(1);
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
$( 1 );
$( 2 );
const b = $( 1 );
const c = a + b;
$( c );
$( b, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x);
const tmpBinBothLhs = a;
$(1);
$(2);
a = $(x);
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, x);
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
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 2
 - 8: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
