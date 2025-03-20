# Preval test case

# auto_computed_complex_complex_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto computed complex complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = { b: $(1) })]: 10 });
$(a)[$("b")] = 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpCalleeParam /*:object*/ = { [a]: 10 };
$(tmpCalleeParam);
const tmpAssignComMemLhsObj /*:unknown*/ = $(a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$({ [a]: 10 });
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
const c = { [ b ]: 10 };
$( c );
const d = $( b );
const e = $( "b" );
d[e] = 2;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { '[object Object]': '10' }
 - 3: { b: '1' }
 - 4: 'b'
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
