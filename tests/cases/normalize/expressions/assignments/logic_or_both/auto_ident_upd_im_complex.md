# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $($(b)).x--) || (a = $($(b)).x--));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$1 /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
let tmpClusterSSA_a /*:unknown*/ = tmpUpdNum;
if (tmpUpdNum) {
  $(tmpUpdNum);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(b);
  const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
  const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
  const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 - 1;
  tmpUpdObj$1.x = tmpUpdInc$1;
  tmpClusterSSA_a = tmpUpdNum$1;
  $(tmpUpdNum$1);
}
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum - 1;
let tmpClusterSSA_a = tmpUpdNum;
if (tmpUpdNum) {
  $(tmpUpdNum);
} else {
  const tmpUpdObj$1 = $($(b));
  const tmpUpdNum$1 = $coerce(tmpUpdObj$1.x, `number`);
  tmpUpdObj$1.x = tmpUpdNum$1 - 1;
  tmpClusterSSA_a = tmpUpdNum$1;
  $(tmpUpdNum$1);
}
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = $($(b)).x--) || (a = $($(b)).x--));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(b);
let tmpUpdObj = $(tmpCalleeParam$1);
let tmpUpdProp = tmpUpdObj.x;
let tmpUpdNum = $coerce(tmpUpdProp, `number`);
let tmpUpdInc = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
a = tmpUpdNum;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$3 = $(b);
  let tmpUpdObj$1 = $(tmpCalleeParam$3);
  let tmpUpdProp$1 = tmpUpdObj$1.x;
  let tmpUpdNum$1 = $coerce(tmpUpdProp$1, `number`);
  let tmpUpdInc$1 = tmpUpdNum$1 - 1;
  tmpUpdObj$1.x = tmpUpdInc$1;
  const tmpNestedComplexRhs = tmpUpdNum$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e - 1;
c.x = f;
let g = e;
if (e) {
  $( e );
}
else {
  const h = $( a );
  const i = $( h );
  const j = i.x;
  const k = $coerce( j, "number" );
  const l = k - 1;
  i.x = l;
  g = k;
  $( k );
}
$( g, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - 4: 1, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
