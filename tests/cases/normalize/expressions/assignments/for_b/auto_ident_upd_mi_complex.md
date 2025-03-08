# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (a = --$($(b)).x); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
let tmpClusterSSA_a /*:unknown*/ = tmpUpdInc;
if (tmpUpdInc) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCalleeParam$1 /*:unknown*/ = $(b);
    const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
    const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
    const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 - 1;
    tmpUpdObj$1.x = tmpUpdInc$1;
    tmpClusterSSA_a = tmpUpdInc$1;
    if (tmpUpdInc$1) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
tmpUpdObj.x = tmpUpdInc;
let tmpClusterSSA_a = tmpUpdInc;
if (tmpUpdInc) {
  while (true) {
    $(1);
    const tmpUpdObj$1 = $($(b));
    const tmpUpdInc$1 = $coerce(tmpUpdObj$1.x, `number`) - 1;
    tmpUpdObj$1.x = tmpUpdInc$1;
    tmpClusterSSA_a = tmpUpdInc$1;
    if (!tmpUpdInc$1) {
      break;
    }
  }
}
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = --$($(b)).x)) {
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCalleeParam = $(b);
  let tmpUpdObj = $(tmpCalleeParam);
  let tmpUpdProp = tmpUpdObj.x;
  let tmpUpdNum = $coerce(tmpUpdProp, `number`);
  let tmpUpdInc = tmpUpdNum - 1;
  tmpUpdObj.x = tmpUpdInc;
  a = tmpUpdInc;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
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
let g = f;
if (f) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const h = $( a );
    const i = $( h );
    const j = i.x;
    const k = $coerce( j, "number" );
    const l = k - 1;
    i.x = l;
    g = l;
    if (l) {

    }
    else {
      break;
    }
  }
}
$( g, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check