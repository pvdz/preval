# Preval test case

# auto_computed_complex_complex_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto computed complex complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = { b: $(1) })]);
$(a)[$("b")] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpCalleeParam /*:array*/ = [...a];
$(tmpCalleeParam);
const tmpAssignComMemLhsObj /*:unknown*/ = $(a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$([...a]);
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
const c = [ ...b ];
$( c );
const d = $( b );
const e = $( "b" );
const f = $( 2 );
d[e] = f;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
