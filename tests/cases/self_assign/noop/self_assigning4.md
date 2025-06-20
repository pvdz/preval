# Preval test case

# self_assigning4.md

> Self assign > Noop > Self assigning4

Point is that this function is called and immediately overrides itself, then calls itself again.

Especially in global, I think we can do better

## Input

`````js filename=intro
// SHOULD inline
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let func/*:(unknown, unknown)=>*/ = function(arg1, arg2) {
  func = function(newArg1, unusedNewArg2) {
    $('a', newArg1, unusedNewArg2);
    const index/*:number*/ = newArg1 - 1;
    const arrval = arr[index];
    $('b', index);
    if (func.IS_EXPANDO_SET === undefined) {
      $('c');
      func.THIS_IS_AN_EXPANDO = $spy;
      arg1 = arguments;
      func.IS_EXPANDO_SET = true;
    }
    const newIndex/*:primitive*/ = index + arr[0];
    $('d', newIndex);
    const arguments_x = arg1[newIndex];                           // Note: at this point this is the original inner `arguments`
    if (arguments_x) {
      $('e');
      return arguments_x;
    } else {
      $('f');
      const expando_result = func.THIS_IS_AN_EXPANDO(arrval);
      $('arg is', typeof arg1)
      arg1[newIndex] = expando_result;
      $('returning', expando_result);
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
const arr /*:array*/ /*truthy*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 /*:unknown*/ = 3;
const func /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  const newArg1 /*:unknown*/ = $$0;
  const unusedNewArg2 /*:unknown*/ = $$1;
  debugger;
  $(`a`, newArg1, unusedNewArg2);
  const index$1 /*:number*/ = newArg1 - 1;
  const arrval /*:primitive*/ = arr[index$1];
  $(`b`, index$1);
  const tmpBinLhs /*:unknown*/ = func.IS_EXPANDO_SET;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
  if (tmpIfTest) {
    $(`c`);
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny;
    func.IS_EXPANDO_SET = true;
  } else {
  }
  const newIndex /*:number*/ = index$1 + 100;
  $(`d`, newIndex);
  const arguments_x /*:unknown*/ = arg1[newIndex];
  if (arguments_x) {
    $(`e`);
    return arguments_x;
  } else {
    $(`f`);
    const tmpMCF /*:unknown*/ = func.THIS_IS_AN_EXPANDO;
    const expando_result /*:unknown*/ = $dotCall(tmpMCF, func, `THIS_IS_AN_EXPANDO`, arrval);
    const tmpCalleeParam /*:string*/ /*truthy*/ = typeof arg1;
    $(`arg is`, tmpCalleeParam);
    arg1[newIndex] = expando_result;
    $(`returning`, expando_result);
    return expando_result;
  }
};
const tmpClusterSSA_a /*:unknown*/ = func(3, 4);
const b /*:unknown*/ = func(1, 2);
$(tmpClusterSSA_a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 = 3;
const func = function (newArg1, unusedNewArg2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(`a`, newArg1, unusedNewArg2);
  const index$1 = newArg1 - 1;
  const arrval = arr[index$1];
  $(`b`, index$1);
  if (func.IS_EXPANDO_SET === undefined) {
    $(`c`);
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny;
    func.IS_EXPANDO_SET = true;
  }
  const newIndex = index$1 + 100;
  $(`d`, newIndex);
  const arguments_x = arg1[newIndex];
  if (arguments_x) {
    $(`e`);
    return arguments_x;
  } else {
    $(`f`);
    const expando_result = func.THIS_IS_AN_EXPANDO(arrval);
    $(`arg is`, typeof arg1);
    arg1[newIndex] = expando_result;
    $(`returning`, expando_result);
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
  const g = $$1;
  debugger;
  $( "a", f, g );
  const h = f - 1;
  const i = a[ h ];
  $( "b", h );
  const j = c.IS_EXPANDO_SET;
  const k = j === undefined;
  if (k) {
    $( "c" );
    c.THIS_IS_AN_EXPANDO = $spy;
    b = d;
    c.IS_EXPANDO_SET = true;
  }
  const l = h + 100;
  $( "d", l );
  const m = b[ l ];
  if (m) {
    $( "e" );
    return m;
  }
  else {
    $( "f" );
    const n = c.THIS_IS_AN_EXPANDO;
    const o = $dotCall( n, c, "THIS_IS_AN_EXPANDO", i );
    const p = typeof b;
    $( "arg is", p );
    b[l] = o;
    $( "returning", o );
    return o;
  }
};
const q = c( 3, 4 );
const r = c( 1, 2 );
$( q, r );
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
    $(`a`, newArg1, unusedNewArg2);
    const index = newArg1 - 1;
    const arrval = arr[index];
    $(`b`, index);
    const tmpBinLhs = func.IS_EXPANDO_SET;
    const tmpIfTest = tmpBinLhs === undefined;
    if (tmpIfTest) {
      $(`c`);
      func.THIS_IS_AN_EXPANDO = $spy;
      arg1 = tmpPrevalAliasArgumentsAny;
      func.IS_EXPANDO_SET = true;
    } else {
    }
    const tmpBinBothLhs = index;
    const tmpBinBothRhs = arr[0];
    const newIndex = tmpBinBothLhs + tmpBinBothRhs;
    $(`d`, newIndex);
    const arguments_x = arg1[newIndex];
    if (arguments_x) {
      $(`e`);
      return arguments_x;
    } else {
      $(`f`);
      const tmpMCF = func.THIS_IS_AN_EXPANDO;
      const expando_result = $dotCall(tmpMCF, func, `THIS_IS_AN_EXPANDO`, arrval);
      let tmpCalleeParam = typeof arg1;
      $(`arg is`, tmpCalleeParam);
      arg1[newIndex] = expando_result;
      $(`returning`, expando_result);
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
 - 1: 'a', 3, 4
 - 2: 'b', 2
 - 3: 'c'
 - 4: 'd', 102
 - 5: 'f'
 - 6: 'Creating spy', 1, 1, [300, 300]
 - 7: 'arg is', 'object'
 - 8: 'returning', '<spy[1]>'
 - 9: 'a', 1, 2
 - 10: 'b', 0
 - 11: 'd', 100
 - 12: 'f'
 - 13: 'Creating spy', 2, 1, [100, 100]
 - 14: 'arg is', 'object'
 - 15: 'returning', '<spy[2]>'
 - 16: '<spy[1]>', '<spy[2]>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
