# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) && (a = $($(b)).x--));
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
if (tmpCalleeParam) {
  const tmpCalleeParam$1 /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
  tmpUpdObj.x = tmpUpdInc;
  a = tmpUpdNum;
  $(tmpUpdNum);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
const b = { x: 1 };
if (tmpCalleeParam) {
  const tmpUpdObj = $($(b));
  const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
  tmpUpdObj.x = tmpUpdNum - 1;
  a = tmpUpdNum;
  $(tmpUpdNum);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(100) && (a = $($(b)).x--));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpCalleeParam$1 = $(b);
  let tmpUpdObj = $(tmpCalleeParam$1);
  let tmpUpdProp = tmpUpdObj.x;
  let tmpUpdNum = $coerce(tmpUpdProp, `number`);
  let tmpUpdInc = tmpUpdNum - 1;
  tmpUpdObj.x = tmpUpdInc;
  const tmpNestedComplexRhs = tmpUpdNum;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
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
const b = $( 100 );
const c = { x: 1 };
if (b) {
  const d = $( c );
  const e = $( d );
  const f = e.x;
  const g = $coerce( f, "number" );
  const h = g - 1;
  e.x = h;
  a = g;
  $( g );
}
else {
  $( b );
}
$( a, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: 1, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
