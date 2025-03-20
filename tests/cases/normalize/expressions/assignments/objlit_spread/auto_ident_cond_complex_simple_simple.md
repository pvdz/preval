# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = $(1) ? 2 : $($(100))) });
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
let tmpObjSpread /*:unknown*/ = 2;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpObjSpread = a;
}
const tmpCalleeParam /*:object*/ = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 2;
const tmpIfTest = $(1);
let tmpObjSpread = 2;
if (!tmpIfTest) {
  a = $($(100));
  tmpObjSpread = a;
}
$({ ...tmpObjSpread });
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
const e = { ... c };
$( e );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
