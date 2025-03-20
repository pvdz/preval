# Preval test case

# auto_seq_simple_computed_complex.md

> Normalize > Expressions > Assignments > Param default > Auto seq simple computed complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { b: $(1) })) {}
$(f());
($(1), a)[$("b")] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(undefined);
$(1);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal };
tmpNestedComplexRhs[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$(undefined);
$(1);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
tmpNestedComplexRhs[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( undefined );
$( 1 );
const b = $( "b" );
const c = $( 2 );
const d = { b: a };
d[b] = c;
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 1
 - 4: 'b'
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
