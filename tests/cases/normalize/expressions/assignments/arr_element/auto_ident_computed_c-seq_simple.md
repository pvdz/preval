# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$("c")]) + (a = (1, 2, $(b))[$("c")]));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpAssignRhsCompObj /*:unknown*/ = $(b);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const a /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
const tmpAssignRhsCompObj$1 /*:unknown*/ = $(b);
const tmpAssignRhsCompProp$1 /*:unknown*/ = $(`c`);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
const a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
const tmpAssignRhsCompObj$1 = $(b);
const tmpAssignRhsCompProp$1 = $(`c`);
const tmpClusterSSA_a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
const e = $( a );
const f = $( "c" );
const g = e[ f ];
const h = d + g;
$( h );
$( g, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
const tmpBinBothLhs = a;
const tmpAssignRhsCompObj$1 = $(b);
const tmpAssignRhsCompProp$1 = $(`c`);
a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: { c: '1' }
 - 4: 'c'
 - 5: 2
 - 6: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
