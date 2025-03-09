# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = ++$($(b)).x));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  $(tmpUpdInc);
  $(tmpUpdInc, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { x: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, b);
} else {
  const tmpUpdObj = $($(b));
  const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
  tmpUpdObj.x = tmpUpdInc;
  $(tmpUpdInc);
  $(tmpUpdInc, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(100) || (a = ++$($(b)).x));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  const tmpCalleeParam$1 = $(b);
  let tmpUpdObj = $(tmpCalleeParam$1);
  let tmpUpdProp = tmpUpdObj.x;
  let tmpUpdNum = $coerce(tmpUpdProp, `number`);
  let tmpUpdInc = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  const tmpNestedComplexRhs = tmpUpdInc;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
if (a) {
  $( a );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c, b );
}
else {
  const d = $( b );
  const e = $( d );
  const f = e.x;
  const g = $coerce( f, "number" );
  const h = g + 1;
  e.x = h;
  $( h );
  $( h, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
