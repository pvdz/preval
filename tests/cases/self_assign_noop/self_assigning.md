# Preval test case

# self_assigning.md

> Self assign noop > Self assigning

Point is that this function is called and immediately overrides itself, then calls itself again.

Especially in global, I think we can do better

## Input

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
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
const arr /*:array*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 /*:unknown*/ = 3;
const func /*:(unknown, unused)=>unknown*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  const newArg1 /*:unknown*/ = $$0;
  debugger;
  const index /*:number*/ = newArg1 - 1;
  const arrval /*:primitive*/ = arr[index];
  const tmpBinLhs /*:unknown*/ = func.IS_EXPANDO_SET;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
  if (tmpIfTest) {
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny;
    func.IS_EXPANDO_SET = true;
  } else {
  }
  const newIndex /*:number*/ = index + 100;
  const arguments_x /*:unknown*/ = arg1[newIndex];
  if (arguments_x) {
    return arguments_x;
  } else {
    const tmpMCF /*:unknown*/ = func.THIS_IS_AN_EXPANDO;
    const expando_result /*:unknown*/ = $dotCall(tmpMCF, func, `THIS_IS_AN_EXPANDO`, arrval);
    arg1[newIndex] = expando_result;
    return expando_result;
  }
};
const a /*:unknown*/ = func(3, 4);
const b /*:unknown*/ = func(1, 2);
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 = 3;
const func = function (newArg1, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const index = newArg1 - 1;
  const arrval = arr[index];
  if (func.IS_EXPANDO_SET === undefined) {
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny;
    func.IS_EXPANDO_SET = true;
  }
  const newIndex = index + 100;
  const arguments_x = arg1[newIndex];
  if (arguments_x) {
    return arguments_x;
  } else {
    const expando_result = func.THIS_IS_AN_EXPANDO(arrval);
    arg1[newIndex] = expando_result;
    return expando_result;
  }
};
$(func(3, 4), func(1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];
let b = 3;
const c = function($$0,$$1 ) {
  const d = e;
  const f = $$0;
  debugger;
  const g = f - 1;
  const h = a[ g ];
  const i = c.IS_EXPANDO_SET;
  const j = i === undefined;
  if (j) {
    c.THIS_IS_AN_EXPANDO = $spy;
    b = d;
    c.IS_EXPANDO_SET = true;
  }
  const k = g + 100;
  const l = b[ k ];
  if (l) {
    return l;
  }
  else {
    const m = c.THIS_IS_AN_EXPANDO;
    const n = $dotCall( m, c, "THIS_IS_AN_EXPANDO", h );
    b[k] = n;
    return n;
  }
};
const o = c( 3, 4 );
const p = c( 1, 2 );
$( o, p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
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
      const tmpMCF = func.THIS_IS_AN_EXPANDO;
      const expando_result = $dotCall(tmpMCF, func, `THIS_IS_AN_EXPANDO`, arrval);
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [300, 300]
 - 2: 'Creating spy', 2, 1, [100, 100]
 - 3: '<spy[1]>', '<spy[2]>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
