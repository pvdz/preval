# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = ++$($(b)).x) : $(200));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  $(tmpUpdInc);
  $(tmpUpdInc, b);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
if (tmpIfTest) {
  const tmpUpdObj = $($(b));
  const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
  tmpUpdObj.x = tmpUpdInc;
  $(tmpUpdInc);
  $(tmpUpdInc, b);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
if (a) {
  const c = $( b );
  const d = $( c );
  const e = d.x;
  const f = $coerce( e, "number" );
  const g = f + 1;
  d.x = g;
  $( g );
  $( g, b );
}
else {
  const h = $( 200 );
  $( h );
  const i = {
    a: 999,
    b: 1000,
  };
  $( i, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 2
 - 5: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
