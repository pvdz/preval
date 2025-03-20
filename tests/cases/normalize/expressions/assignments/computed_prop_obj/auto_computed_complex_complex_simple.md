# Preval test case

# auto_computed_complex_complex_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto computed complex complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) })["a"];
$(a)[$("b")] = 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$Object_prototype.a;
const a /*:object*/ = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj /*:unknown*/ = $(a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$Object_prototype.a;
const a = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$Object_prototype.a;
const b = { b: a };
const c = $( b );
const d = $( "b" );
c[d] = 2;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 'b'
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
