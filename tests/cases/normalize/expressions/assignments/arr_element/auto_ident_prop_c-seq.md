# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).c) + (a = (1, 2, $(b)).c));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
const tmpAssignRhsProp$1 /*:unknown*/ = $(b);
const tmpClusterSSA_a$1 /*:unknown*/ = tmpAssignRhsProp$1.c;
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_a + tmpClusterSSA_a$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a$1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpClusterSSA_a = $(b).c;
const tmpClusterSSA_a$1 = $(b).c;
$(tmpClusterSSA_a + tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
const d = $( a );
const e = d.c;
const f = c + e;
$( f );
$( e, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: { c: '1' }
 - 3: 2
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
