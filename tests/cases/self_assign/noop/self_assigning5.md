# Preval test case

# self_assigning5.md

> Self assign > Noop > Self assigning5

Point is that this function is called and immediately overrides itself, then calls itself again.

Especially in global, I think we can do better

## Input

`````js filename=intro
// SHOULD inline
const arr /*:array*/ = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];
let arg1 /*:unknown*/ = 3;
let func /*:(unknown, unknown)=>unknown*/ = function($$0, $$1) {
  const tmpPrevalAliasArgumentsAny$1 /*:arguments*/ = arguments;
  let $dlr_$$0 /*:unknown*/ = $$0;
  let $dlr_$$1 /*:unknown*/ = $$1;
  debugger;
  const tmpPrevalAliasArgumentsAny /*:unknown*/ = tmpPrevalAliasArgumentsAny$1;
  const newArg1 /*:unknown*/ = $dlr_$$0;
  $dlr_$$1;
  $(`a`, newArg1, $dlr_$$1);
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
  } else {}
  const newIndex /*:number*/ = index$1 + 100;
  $(`d`, newIndex);
  const arguments_x /*:unknown*/ = arg1[newIndex];
  if (arguments_x) {
    $(`e`);
    return arguments_x;
  } else {
    $(`f`);
    const tmpCallCompVal /*:unknown*/ = func.THIS_IS_AN_EXPANDO;
    const expando_result /*:unknown*/ = $dotCall(tmpCallCompVal, func, `THIS_IS_AN_EXPANDO`, arrval);
    const tmpCalleeParam /*:string*/ = typeof arg1;
    $(`arg is`, tmpCalleeParam);
    arg1[newIndex] = expando_result;
    $(`returning`, expando_result);
    return expando_result;
  }
};
const a /*:unknown*/ = func(3, 4);
const b /*:unknown*/ = func(1, 2);
$(a, b);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 /*:unknown*/ = 3;
let func_IS_EXPANDO_SET /*:primitive: true | undefined*/ = undefined;
let func_THIS_IS_AN_EXPANDO /*:unknown*/ = undefined;
const func /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1 /*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny$2 /*:arguments*/ /*truthy*/ = arguments;
  const $dlr_$$0 /*:unknown*/ = $$0;
  const $dlr_$$1 /*:unknown*/ = $$1;
  debugger;
  $(`a`, $dlr_$$0, $dlr_$$1);
  const index$1 /*:number*/ = $dlr_$$0 - 1;
  const arrval /*:primitive*/ = arr[index$1];
  $(`b`, index$1);
  const tmpIfTest /*:boolean*/ = func_IS_EXPANDO_SET === undefined;
  if (tmpIfTest) {
    $(`c`);
    func_THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny$2;
    func_IS_EXPANDO_SET = true;
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
    const expando_result /*:unknown*/ = $dotCall(func_THIS_IS_AN_EXPANDO, func, `THIS_IS_AN_EXPANDO`, arrval);
    const tmpCalleeParam /*:string*/ /*truthy*/ = typeof arg1;
    $(`arg is`, tmpCalleeParam);
    arg1[newIndex] = expando_result;
    $(`returning`, expando_result);
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
let func_IS_EXPANDO_SET = undefined;
let func_THIS_IS_AN_EXPANDO = undefined;
const func = function ($dlr_$$0, $dlr_$$1) {
  const tmpPrevalAliasArgumentsAny$2 = arguments;
  $(`a`, $dlr_$$0, $dlr_$$1);
  const index$1 = $dlr_$$0 - 1;
  const arrval = arr[index$1];
  $(`b`, index$1);
  if (func_IS_EXPANDO_SET === undefined) {
    $(`c`);
    func_THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny$2;
    func_IS_EXPANDO_SET = true;
  }
  const newIndex = index$1 + 100;
  $(`d`, newIndex);
  const arguments_x = arg1[newIndex];
  if (arguments_x) {
    $(`e`);
    return arguments_x;
  } else {
    $(`f`);
    const expando_result = $dotCall(func_THIS_IS_AN_EXPANDO, func, `THIS_IS_AN_EXPANDO`, arrval);
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
let c = undefined;
let d = undefined;
const e = function($$0,$$1 ) {
  const f = g;
  const h = $$0;
  const i = $$1;
  debugger;
  $( "a", h, i );
  const j = h - 1;
  const k = a[ j ];
  $( "b", j );
  const l = c === undefined;
  if (l) {
    $( "c" );
    d = $spy;
    b = f;
    c = true;
  }
  const m = j + 100;
  $( "d", m );
  const n = b[ m ];
  if (n) {
    $( "e" );
    return n;
  }
  else {
    $( "f" );
    const o = $dotCall( d, e, "THIS_IS_AN_EXPANDO", k );
    const p = typeof b;
    $( "arg is", p );
    b[m] = o;
    $( "returning", o );
    return o;
  }
};
const q = e( 3, 4 );
const r = e( 1, 2 );
$( q, r );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 = 3;
let func = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny$2 = arguments;
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const tmpPrevalAliasArgumentsAny$1 = tmpPrevalAliasArgumentsAny$2;
  let $dlr_$$2 = $dlr_$$0;
  let $dlr_$$4 = $dlr_$$1;
  const tmpPrevalAliasArgumentsAny = tmpPrevalAliasArgumentsAny$1;
  const newArg1 = $dlr_$$2;
  $(`a`, $dlr_$$2, $dlr_$$4);
  const index$1 = newArg1 - 1;
  const arrval = arr[index$1];
  $(`b`, index$1);
  const tmpBinLhs = func.IS_EXPANDO_SET;
  const tmpIfTest = tmpBinLhs === undefined;
  if (tmpIfTest) {
    $(`c`);
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny;
    func.IS_EXPANDO_SET = true;
  } else {
  }
  const newIndex = index$1 + 100;
  $(`d`, newIndex);
  const arguments_x = arg1[newIndex];
  if (arguments_x) {
    $(`e`);
    return arguments_x;
  } else {
    $(`f`);
    const tmpCallCompVal = func.THIS_IS_AN_EXPANDO;
    const expando_result = $dotCall(tmpCallCompVal, func, `THIS_IS_AN_EXPANDO`, arrval);
    const tmpCalleeParam = typeof arg1;
    $(`arg is`, tmpCalleeParam);
    arg1[newIndex] = expando_result;
    $(`returning`, expando_result);
    return expando_result;
  }
};
const a = func(3, 4);
const b = func(1, 2);
$(a, b);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


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
