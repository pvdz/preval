# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$({ x: (a = (1, 2, $(b)).c) });
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
const tmpCalleeParam /*:object*/ = { x: tmpClusterSSA_a };
$(tmpCalleeParam);
$(tmpClusterSSA_a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpClusterSSA_a = $(b).c;
$({ x: tmpClusterSSA_a });
$(tmpClusterSSA_a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
const d = { x: c };
$( d );
$( c, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: { x: '1' }
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
