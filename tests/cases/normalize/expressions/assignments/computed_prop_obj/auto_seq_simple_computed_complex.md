# Preval test case

# auto_seq_simple_computed_complex.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto seq simple computed complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) })["a"];
($(1), a)[$("b")] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(1);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
const a /*:object*/ = { b: tmpObjLitVal };
a[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$(1);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
const a = { b: tmpObjLitVal };
a[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( 1 );
const b = $( "b" );
const c = $( 2 );
const d = { b: a };
d[b] = c;
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'b'
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
