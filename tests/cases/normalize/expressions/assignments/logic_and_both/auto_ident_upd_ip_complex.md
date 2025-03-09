# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $($(b)).x++) && (a = $($(b)).x++));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$1 /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdNum) {
  const tmpCalleeParam$3 /*:unknown*/ = $(b);
  const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
  const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
  const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 + 1;
  tmpUpdObj$1.x = tmpUpdInc$1;
  $(tmpUpdNum$1);
  $(tmpUpdNum$1, b);
} else {
  $(tmpUpdNum);
  $(tmpUpdNum, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum + 1;
if (tmpUpdNum) {
  const tmpUpdObj$1 = $($(b));
  const tmpUpdNum$1 = $coerce(tmpUpdObj$1.x, `number`);
  tmpUpdObj$1.x = tmpUpdNum$1 + 1;
  $(tmpUpdNum$1);
  $(tmpUpdNum$1, b);
} else {
  $(tmpUpdNum);
  $(tmpUpdNum, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = $($(b)).x++) && (a = $($(b)).x++));
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
let tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
a = tmpUpdNum;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCalleeParam$3 = $(b);
  let tmpUpdObj$1 = $(tmpCalleeParam$3);
  let tmpUpdProp$1 = tmpUpdObj$1.x;
  let tmpUpdNum$1 = $coerce(tmpUpdProp$1, `number`);
  let tmpUpdInc$1 = tmpUpdNum$1 + 1;
  tmpUpdObj$1.x = tmpUpdInc$1;
  const tmpNestedComplexRhs = tmpUpdNum$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
  $(tmpCalleeParam);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
if (e) {
  const g = $( a );
  const h = $( g );
  const i = h.x;
  const j = $coerce( i, "number" );
  const k = j + 1;
  h.x = k;
  $( j );
  $( j, a );
}
else {
  $( e );
  $( e, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '2' }
 - 4: { x: '2' }
 - 5: 2
 - 6: 2, { x: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
