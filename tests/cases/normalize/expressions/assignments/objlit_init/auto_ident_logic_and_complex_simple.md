# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = $($(1)) && 2) });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpObjLitVal /*:unknown*/ = 2;
if (a) {
  a = 2;
} else {
  tmpObjLitVal = a;
}
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
let tmpObjLitVal = 2;
if (a) {
  a = 2;
} else {
  tmpObjLitVal = a;
}
$({ x: tmpObjLitVal });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
let c = 2;
if (b) {
  b = 2;
}
else {
  c = b;
}
const d = { x: c };
$( d );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '2' }
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
