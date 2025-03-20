# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(b).c)];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
const obj /*:object*/ = {};
obj[tmpClusterSSA_a];
$(tmpClusterSSA_a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpClusterSSA_a = $(b).c;
({}[tmpClusterSSA_a]);
$(tmpClusterSSA_a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
const d = {};
d[ c ];
$( c, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
