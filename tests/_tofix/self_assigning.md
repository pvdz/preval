# Preval test case

# self_assigning.md

> Tofix > self assigning

Point is that this function is called and immediately overrides itself, then calls itself again.

Especially in global, I think we can do better

## Input

`````js filename=intro
const arr = $([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
let func/*:(unknown, unknown)=>*/ = function(arg1, arg2) {
  func = function(newArg1, unusedNewArg2) {
    const index/*:number*/ = newArg1 - 1;
    const arrval = arr[index];
    if (func.IS_EXPANDO_SET === undefined) {
      func.THIS_IS_AN_EXPANDO = $spy;
      arg1 = arguments;
      func.IS_EXPANDO_SET = true;
    }
    const newIndex/*:primitive*/ = index + arr[0];
    const arguments_x = arg1[newIndex];                           // Note: at this point this is the original inner `arguments`
    if (arguments_x) {
      return arguments_x;
    } else {
      const expando_result = func.THIS_IS_AN_EXPANDO(arrval);
      arg1[newIndex] = expando_result;
      return expando_result;
    }
  };
  const r = func(arg1, arg2);
  return r;
};
// If func escapes and we can't assert the first call to it, we are SooL.
// We need to know the values of the args of the first call otherwise we
// won't know what the closure value for newArg1 is.
// Arg2 seems unused but since `arguments` is stored and cached in a
// closure, it may not be dead either.
// The function tends to be aliased too, which complicates the search.
// But we can still assert what the first call site is of this func.
const alias = func;
const a = alias(3, 4);
const b = func(1, 2);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const arr /*:unknown*/ = $(tmpCalleeParam);
let func /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  let arg1 /*:unknown*/ = $$0;
  const arg2 /*:unknown*/ = $$1;
  debugger;
  func = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
    const newArg1 /*:unknown*/ = $$0;
    debugger;
    const index /*:number*/ = newArg1 - 1;
    const arrval /*:unknown*/ = arr[index];
    const tmpBinLhs /*:unknown*/ = func.IS_EXPANDO_SET;
    const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
    if (tmpIfTest) {
      func.THIS_IS_AN_EXPANDO = $spy;
      arg1 = tmpPrevalAliasArgumentsAny;
      func.IS_EXPANDO_SET = true;
    } else {
    }
    const tmpBinBothRhs /*:unknown*/ = arr[0];
    const newIndex /*:primitive*/ = index + tmpBinBothRhs;
    const arguments_x /*:unknown*/ = arg1[newIndex];
    if (arguments_x) {
      return arguments_x;
    } else {
      const expando_result /*:unknown*/ = func.THIS_IS_AN_EXPANDO(arrval);
      arg1[newIndex] = expando_result;
      return expando_result;
    }
  };
  const r /*:unknown*/ = func(arg1, arg2);
  return r;
};
const a /*:unknown*/ = func(3, 4);
const b /*:unknown*/ = func(1, 2);
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
let func = function (arg1, arg2) {
  func = function (newArg1, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    const index = newArg1 - 1;
    const arrval = arr[index];
    if (func.IS_EXPANDO_SET === undefined) {
      func.THIS_IS_AN_EXPANDO = $spy;
      arg1 = tmpPrevalAliasArgumentsAny;
      func.IS_EXPANDO_SET = true;
    }
    const newIndex = index + arr[0];
    const arguments_x = arg1[newIndex];
    if (arguments_x) {
      return arguments_x;
    } else {
      const expando_result = func.THIS_IS_AN_EXPANDO(arrval);
      arg1[newIndex] = expando_result;
      return expando_result;
    }
  };
  const r = func(arg1, arg2);
  return r;
};
$(func(3, 4), func(1, 2));
`````

## Pre Normal


`````js filename=intro
const arr = $([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
let func = function ($$0, $$1) {
  let arg1 = $$0;
  let arg2 = $$1;
  debugger;
  func = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    let newArg1 = $$0;
    let unusedNewArg2 = $$1;
    debugger;
    const index = newArg1 - 1;
    const arrval = arr[index];
    if (func.IS_EXPANDO_SET === undefined) {
      func.THIS_IS_AN_EXPANDO = $spy;
      arg1 = tmpPrevalAliasArgumentsAny;
      func.IS_EXPANDO_SET = true;
    }
    const newIndex = index + arr[0];
    const arguments_x = arg1[newIndex];
    if (arguments_x) {
      return arguments_x;
    } else {
      const expando_result = func.THIS_IS_AN_EXPANDO(arrval);
      arg1[newIndex] = expando_result;
      return expando_result;
    }
  };
  const r = func(arg1, arg2);
  return r;
};
const alias = func;
const a = alias(3, 4);
const b = func(1, 2);
$(a, b);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const arr = $(tmpCalleeParam);
let func = function ($$0, $$1) {
  let arg1 = $$0;
  let arg2 = $$1;
  debugger;
  func = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    let newArg1 = $$0;
    let unusedNewArg2 = $$1;
    debugger;
    const index = newArg1 - 1;
    const arrval = arr[index];
    const tmpBinLhs = func.IS_EXPANDO_SET;
    const tmpIfTest = tmpBinLhs === undefined;
    if (tmpIfTest) {
      func.THIS_IS_AN_EXPANDO = $spy;
      arg1 = tmpPrevalAliasArgumentsAny;
      func.IS_EXPANDO_SET = true;
    } else {
    }
    const tmpBinBothLhs = index;
    const tmpBinBothRhs = arr[0];
    const newIndex = tmpBinBothLhs + tmpBinBothRhs;
    const arguments_x = arg1[newIndex];
    if (arguments_x) {
      return arguments_x;
    } else {
      const expando_result = func.THIS_IS_AN_EXPANDO(arrval);
      arg1[newIndex] = expando_result;
      return expando_result;
    }
  };
  const r = func(arg1, arg2);
  return r;
};
const alias = func;
const a = func(3, 4);
const b = func(1, 2);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];
const b = $( a );
let c = function($$0,$$1 ) {
  let d = $$0;
  const e = $$1;
  debugger;
  c = function($$0,$$1 ) {
    const f = g;
    const h = $$0;
    debugger;
    const i = h - 1;
    const j = b[ i ];
    const k = c.IS_EXPANDO_SET;
    const l = k === undefined;
    if (l) {
      c.THIS_IS_AN_EXPANDO = $spy;
      d = f;
      c.IS_EXPANDO_SET = true;
    }
    const m = b[ 0 ];
    const n = i + m;
    const o = d[ n ];
    if (o) {
      return o;
    }
    else {
      const p = c.THIS_IS_AN_EXPANDO( j );
      d[n] = p;
      return p;
    }
  };
  const q = c( d, e );
  return q;
};
const r = c( 3, 4 );
const s = c( 1, 2 );
$( r, s );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
 - 2: 'Creating spy', 1, 1, [300, 300]
 - 3: 'Creating spy', 2, 1, [100, 100]
 - 4: '<spy[1]>', '<spy[2]>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
