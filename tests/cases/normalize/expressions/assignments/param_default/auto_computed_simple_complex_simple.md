# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { b: $(1) })) {}
$(f());
a[$("b")] = 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(undefined);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal };
tmpNestedComplexRhs[tmpAssignComMemLhsProp] = 2;
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$(undefined);
const tmpAssignComMemLhsProp = $(`b`);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
tmpNestedComplexRhs[tmpAssignComMemLhsProp] = 2;
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( undefined );
const b = $( "b" );
const c = { b: a };
c[b] = 2;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 'b'
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
