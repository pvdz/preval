# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { x: $(1), y: 2, z: $(3) }) });
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $(1);
const tmpObjLitVal$5 /*:unknown*/ = $(3);
const a /*:object*/ = { x: tmpObjLitVal$1, y: 2, z: tmpObjLitVal$5 };
const tmpCalleeParam /*:object*/ = { x: a };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = $(1);
const tmpObjLitVal$5 = $(3);
const a = { x: tmpObjLitVal$1, y: 2, z: tmpObjLitVal$5 };
$({ x: a });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {
  x: a,
  y: 2,
  z: b,
};
const d = { x: c };
$( d );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal$1 = $(1);
const tmpObjLitVal$3 = 2;
const tmpObjLitVal$5 = $(3);
a = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: tmpObjLitVal$5 };
const tmpObjLitVal = a;
let tmpCalleeParam = { x: tmpObjLitVal };
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
 - 3: { x: '{"x":"1","y":"2","z":"3"}' }
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
