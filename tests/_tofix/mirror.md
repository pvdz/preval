# Preval test case

# mirror.md

> Tofix > mirror
>
> If a var is always the same value as another then it's redaundant

In this case the `mirror` var mirrors `a`

The simple case is checking whether at any point when the one var is written to,
the other var gets updated with the same value as well (direct or indirect).

The case here is trivially caught but not sure how generic we can make this.

See also the variation of tests/cases/normalize/expressions/assignments/logic_or_both/auto_ident_logic_or_complex_complex.md

## Input

`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
let mirror /*:unknown*/ = undefined;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  a = $dotCall($, tmpObjLitVal$1, `e`, 1);
  mirror = a;
}
if (a) {
  $(mirror);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
let mirror /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal$1 /*:object*/ /*truthy*/ = { e: $ };
  a = $dotCall($, tmpObjLitVal$1, `e`, 1);
  mirror = a;
}
if (a) {
  $(mirror);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest$1 = $ == null;
let mirror = undefined;
if (!tmpIfTest$1) {
  a = $dotCall($, { e: $ }, `e`, 1);
  mirror = a;
}
if (a) {
  $(mirror);
  $(a);
} else {
  $($(100));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
let c = undefined;
if (b) {

}
else {
  const d = { e: $ };
  a = $dotCall( $, d, "e", 1 );
  c = a;
}
if (a) {
  $( c );
  $( a );
}
else {
  const e = $( 100 );
  $( e );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const tmpIfTest$1 = $ == null;
let mirror = undefined;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal$1 = { e: $ };
  a = $dotCall($, tmpObjLitVal$1, `e`, 1);
  mirror = a;
}
if (a) {
  $(mirror);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
