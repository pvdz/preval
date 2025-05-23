# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))) });
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = 60;
const tmpIfTest /*:unknown*/ = $(30);
let tmpObjLitVal /*:unknown*/ /*ternaryConst*/ = 60;
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
let a = 60;
const tmpIfTest = $(30);
let tmpObjLitVal = 60;
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
let a = 60;
const b = $( 30 );
let c = 60;
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
 - 1: 30
 - 2: { x: '60' }
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
