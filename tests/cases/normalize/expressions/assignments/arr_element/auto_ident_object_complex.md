# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) + (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
const tmpObjLitVal$5 /*:unknown*/ = $(1);
const tmpObjLitVal$9 /*:unknown*/ = $(3);
const a /*:object*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
const tmpClusterSSA_a /*:object*/ = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(1);
const tmpObjLitVal$9 = $(3);
const a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
const tmpClusterSSA_a = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = $( 1 );
const d = $( 3 );
const e = {
  x: a,
  y: 2,
  z: b,
};
const f = {
  x: c,
  y: 2,
  z: d,
};
const g = e + f;
$( g );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
const tmpBinBothLhs = a;
const tmpObjLitVal$5 = $(1);
const tmpObjLitVal$7 = 2;
const tmpObjLitVal$9 = $(3);
a = { x: tmpObjLitVal$5, y: tmpObjLitVal$7, z: tmpObjLitVal$9 };
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: '[object Object][object Object]'
 - 6: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
