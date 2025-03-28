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
let tmpExpando /*:primitive*/ = undefined;
const arr /*:array*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const func /*:(unknown, unused)=>unknown*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  const newArg1 /*:unknown*/ = $$0;
  debugger;
  let tmpssa3_tmpExpando$1 /*:unknown*/ = undefined;
  let tmpssa3_arg1 /*:unknown*/ = 3;
  const index$1 /*:number*/ = newArg1 - 1;
  const arrval /*:primitive*/ = arr[index$1];
  const tmpIfTest /*:boolean*/ = tmpExpando === undefined;
  if (tmpIfTest) {
    tmpssa3_tmpExpando$1 = $spy;
    tmpssa3_arg1 = tmpPrevalAliasArgumentsAny;
    tmpExpando = true;
  } else {
  }
  const newIndex /*:number*/ = index$1 + 100;
  const arguments_x /*:unknown*/ = tmpssa3_arg1[newIndex];
  if (arguments_x) {
    return arguments_x;
  } else {
    const expando_result /*:unknown*/ = tmpssa3_tmpExpando$1.call(func, arrval);
    tmpssa3_arg1[newIndex] = expando_result;
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
let tmpExpando = undefined;
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const func = function (newArg1, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let tmpssa3_tmpExpando$1 = undefined;
  let tmpssa3_arg1 = 3;
  const index$1 = newArg1 - 1;
  const arrval = arr[index$1];
  if (tmpExpando === undefined) {
    tmpssa3_tmpExpando$1 = $spy;
    tmpssa3_arg1 = tmpPrevalAliasArgumentsAny;
    tmpExpando = true;
  }
  const newIndex = index$1 + 100;
  const arguments_x = tmpssa3_arg1[newIndex];
  if (arguments_x) {
    return arguments_x;
  } else {
    const expando_result = tmpssa3_tmpExpando$1.call(func, arrval);
    tmpssa3_arg1[newIndex] = expando_result;
    return expando_result;
  }
};
$(func(3, 4), func(1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];
const c = function($$0,$$1 ) {
  const d = e;
  const f = $$0;
  debugger;
  let g = undefined;
  let h = 3;
  const i = f - 1;
  const j = b[ i ];
  const k = a === undefined;
  if (k) {
    g = $spy;
    h = d;
    a = true;
  }
  const l = i + 100;
  const m = h[ l ];
  if (m) {
    return m;
  }
  else {
    const n = g.call( c, j );
    h[l] = n;
    return n;
  }
};
const o = c( 3, 4 );
const p = c( 1, 2 );
$( o, p );
`````


## Todos triggered


- (todo) inline computed array property read


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

Post settled calls: BAD!!
 - 1: 'Creating spy', 1, 1, [300, 300]
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Denormalized calls: BAD!!
 - 1: 'Creating spy', 1, 1, [300, 300]
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
