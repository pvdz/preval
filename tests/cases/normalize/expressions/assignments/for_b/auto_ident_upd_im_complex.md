# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (a = $($(b)).x--); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdNum) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCalleeParam$1 /*:unknown*/ = $(b);
    const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
    const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
    const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 - 1;
    tmpUpdObj$1.x = tmpUpdInc$1;
    a = tmpUpdNum$1;
    if (tmpUpdNum$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpUpdNum, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum - 1;
if (tmpUpdNum) {
  while (true) {
    $(1);
    const tmpUpdObj$1 = $($(b));
    const tmpUpdNum$1 = $coerce(tmpUpdObj$1.x, `number`);
    tmpUpdObj$1.x = tmpUpdNum$1 - 1;
    a = tmpUpdNum$1;
    if (!tmpUpdNum$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpUpdNum, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = $($(b)).x--)) {
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
  a = tmpUpdNum;
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
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = $( c );
const e = d.x;
const f = $coerce( e, "number" );
const g = f - 1;
d.x = g;
if (f) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const h = $( b );
    const i = $( h );
    const j = i.x;
    const k = $coerce( j, "number" );
    const l = k - 1;
    i.x = l;
    a = k;
    if (k) {

    }
    else {
      break;
    }
  }
  $( a, b );
}
else {
  $( f, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - 4: { x: '0' }
 - 5: { x: '0' }
 - 6: 0, { x: '-1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check