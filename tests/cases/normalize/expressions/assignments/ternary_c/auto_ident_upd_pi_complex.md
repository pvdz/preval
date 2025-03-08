# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = ++$($(b)).x));
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  a = tmpUpdInc;
  $(tmpUpdInc);
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
const b = { x: 1 };
if (tmpIfTest) {
  $($(100));
} else {
  const tmpUpdObj = $($(b));
  const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
  tmpUpdObj.x = tmpUpdInc;
  a = tmpUpdInc;
  $(tmpUpdInc);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = ++$($(b)).x));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
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
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 0 );
const c = { x: 1 };
if (b) {
  const d = $( 100 );
  $( d );
}
else {
  const e = $( c );
  const f = $( e );
  const g = f.x;
  const h = $coerce( g, "number" );
  const i = h + 1;
  f.x = i;
  a = i;
  $( i );
}
$( a, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 2
 - 5: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
