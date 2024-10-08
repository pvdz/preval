# Preval test case

# no_closure.md

> Function self assign closure alias > No closure
>
>

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
const alias = f;
$(f(427 + 1));
$(f(427 + 2));
$(f(427 + 3));
$(alias);
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
const alias = f;
$(f(427 + 1));
$(f(427 + 2));
$(f(427 + 3));
$(alias);
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
const alias = f;
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = 428;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = 429;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpCalleeParam$9 = 430;
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9);
tmpCallCallee$7(tmpCalleeParam$7);
$(alias);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [1, 2, 3, 4];
let f /*:(unknown, unknown)=>*/ = function ($$0, $$1) {
  const a = $$0;
  const b = $$1;
  debugger;
  f = function ($$0, $$1) {
    const c = $$0;
    debugger;
    const index /*:number*/ = c - 427;
    const n = arr[index];
    return n;
  };
  const tmp = f(a, b);
  return tmp;
};
const alias = f;
const tmpCalleeParam = f(428);
$(tmpCalleeParam);
const tmpCalleeParam$3 = f(429);
$(tmpCalleeParam$3);
const tmpCalleeParam$7 = f(430);
$(tmpCalleeParam$7);
$(alias);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
let b = function($$0,$$1 ) {
  const c = d;
  const e = f;
  debugger;
  b = function($$0,$$1 ) {
    const g = d;
    debugger;
    const h = g - 427;
    const i = a[ h ];
    return i;
  };
  const j = b( c, e );
  return j;
};
const k = b;
const l = b( 428 );
$( l );
const m = b( 429 );
$( m );
const n = b( 430 );
$( n );
$( k );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 4
 - 4: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
