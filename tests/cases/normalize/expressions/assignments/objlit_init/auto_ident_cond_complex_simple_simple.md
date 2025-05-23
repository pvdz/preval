# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = $(1) ? 2 : $($(100))) });
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
let tmpObjLitVal /*:unknown*/ /*ternaryConst*/ = 2;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpObjLitVal = a;
}
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 2;
const tmpIfTest = $(1);
let tmpObjLitVal = 2;
if (!tmpIfTest) {
  a = $($(100));
  tmpObjLitVal = a;
}
$({ x: tmpObjLitVal });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
let c = 2;
if (b) {

}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
const e = { x: c };
$( e );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '2' }
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
