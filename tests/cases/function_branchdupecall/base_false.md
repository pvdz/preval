# Preval test case

# base_false.md

> Function branchdupecall > Base false
>
> If a function ends with an if-else that calls the same function in the same way and returns it, then it should not have that as a branch.

## Input

`````js filename=intro
function g(a, b, c) {
  return a + b + c;
}
function f(a, x, y ,z) {
  if (a) {
    const t1 = g(x, y ,z);
    return t1;
  } else {
    const t2 = g(x, y ,z);
    return t2;
  }
}

// All these values are $ wrapped to prevent Preval from optimizing the whole thing away prematurely
const v = $(false);
const p = $(1);
const q = $(3);
const r = $(5);
$(f(v, p, q, r));
`````

## Settled


`````js filename=intro
$(false);
const p /*:unknown*/ = $(1);
const q /*:unknown*/ = $(3);
const r /*:unknown*/ = $(5);
const tmpBinLhs /*:primitive*/ = p + q;
const tmpReturnArg /*:primitive*/ = tmpBinLhs + r;
$(tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
const p = $(1);
const q = $(3);
const r = $(5);
$(p + q + r);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2, $$3) {
  let a$1 = $$0;
  let x = $$1;
  let y = $$2;
  let z = $$3;
  debugger;
  if (a$1) {
    const t1 = g(x, y, z);
    return t1;
  } else {
    const t2 = g(x, y, z);
    return t2;
  }
};
let g = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  return a + b + c;
};
const v = $(false);
const p = $(1);
const q = $(3);
const r = $(5);
$(f(v, p, q, r));
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2, $$3) {
  let a$1 = $$0;
  let x = $$1;
  let y = $$2;
  let z = $$3;
  debugger;
  if (a$1) {
    const t1 = g(x, y, z);
    return t1;
  } else {
    const t2 = g(x, y, z);
    return t2;
  }
};
let g = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  const tmpBinLhs = a + b;
  const tmpReturnArg = tmpBinLhs + c;
  return tmpReturnArg;
};
const v = $(false);
const p = $(1);
const q = $(3);
const r = $(5);
const tmpCalleeParam = f(v, p, q, r);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( false );
const a = $( 1 );
const b = $( 3 );
const c = $( 5 );
const d = a + b;
const e = d + c;
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - 2: 1
 - 3: 3
 - 4: 5
 - 5: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
