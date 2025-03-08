# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = --$($(b)).x) {}
$(f());
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
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
tmpUpdObj.x = $coerce(tmpUpdObj.x, `number`) - 1;
$(undefined);
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? --$($(b)).x : tmpParamBare;
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = $(b);
    let tmpUpdObj = $(tmpCalleeParam);
    let tmpUpdProp = tmpUpdObj.x;
    let tmpUpdNum = $coerce(tmpUpdProp, `number`);
    let tmpUpdInc = tmpUpdNum - 1;
    tmpUpdObj.x = tmpUpdInc;
    p = tmpUpdInc;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
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
$( undefined );
const g = {
  a: 999,
  b: 1000,
};
$( g, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: undefined
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
