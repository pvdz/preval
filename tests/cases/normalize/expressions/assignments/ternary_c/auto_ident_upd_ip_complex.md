# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $($(b)).x++));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  $(tmpUpdNum);
  $(tmpUpdNum, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const b = { x: 1 };
if (tmpIfTest) {
  $($(100));
  $({ a: 999, b: 1000 }, b);
} else {
  const tmpUpdObj = $($(b));
  const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
  tmpUpdObj.x = tmpUpdNum + 1;
  $(tmpUpdNum);
  $(tmpUpdNum, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = { x: 1 };
if (a) {
  const c = $( 100 );
  $( c );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, b );
}
else {
  const e = $( b );
  const f = $( e );
  const g = f.x;
  const h = $coerce( g, "number" );
  const i = h + 1;
  f.x = i;
  $( h );
  $( h, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: 1, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
