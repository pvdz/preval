# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(1) ? --$($(b)).x : $(200);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
  tmpUpdObj.x = tmpUpdInc;
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpUpdObj = $($(b));
  tmpUpdObj.x = $coerce(tmpUpdObj.x, `number`) - 1;
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(1) ? --$($(b)).x : $(200);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  let tmpUpdObj = $(tmpCalleeParam);
  let tmpUpdProp = tmpUpdObj.x;
  let tmpUpdNum = $coerce(tmpUpdProp, `number`);
  let tmpUpdInc = tmpUpdNum - 1;
  tmpUpdObj.x = tmpUpdInc;
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  const d = $( b );
  const e = $( d );
  const f = e.x;
  const g = $coerce( f, "number" );
  const h = g - 1;
  e.x = h;
  $( c, b );
}
else {
  $( 200 );
  $( c, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
