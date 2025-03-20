# Preval test case

# no_closure_no_escape.md

> Function self assign closure alias > No closure no escape

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
let f = function(a, b) {
  f = function(c, d) {
    const index = c - 427;
    const n = arr[index];
    return n;
  };
  const tmp = f(a, b);
  return tmp;
};
$(f(427 + 1));
$(f(427 + 2));
$(f(427 + 3));
`````

## Settled


`````js filename=intro
$(2);
$(3);
$(4);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(3);
$(4);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3, 4];
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  f = function ($$0, $$1) {
    let c = $$0;
    let d = $$1;
    debugger;
    const index = c - 427;
    const n = arr[index];
    return n;
  };
  const tmp = f(a, b);
  return tmp;
};
$(f(427 + 1));
$(f(427 + 2));
$(f(427 + 3));
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3, 4];
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  f = function ($$0, $$1) {
    let c = $$0;
    let d = $$1;
    debugger;
    const index = c - 427;
    const n = arr[index];
    return n;
  };
  const tmp = f(a, b);
  return tmp;
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = 428;
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
const tmpCalleeParam$5 = 429;
const tmpCalleeParam$3 = tmpCallCallee$1(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
const tmpCalleeParam$9 = 430;
const tmpCalleeParam$7 = tmpCallCallee$3(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 3 );
$( 4 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
