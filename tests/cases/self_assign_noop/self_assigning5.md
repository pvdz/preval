# Preval test case

# self_assigning5.md

> Self assign noop > Self assigning5

Point is that this function is called and immediately overrides itself, then calls itself again.

Especially in global, I think we can do better

## Input

`````js filename=intro
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
const arr /*:array*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 /*:unknown*/ = 3;
const func /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny$2 /*:arguments*/ = arguments;
  const $dlr_$$0 /*:unknown*/ = $$0;
  const $dlr_$$1 /*:unknown*/ = $$1;
  debugger;
  $(`a`, $dlr_$$0, $dlr_$$1);
  const index$1 /*:number*/ = $dlr_$$0 - 1;
  const arrval /*:primitive*/ = arr[index$1];
  $(`b`, index$1);
  const tmpBinLhs /*:unknown*/ = func.IS_EXPANDO_SET;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
  if (tmpIfTest) {
    $(`c`);
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny$2;
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 = 3;
const func = function ($dlr_$$0, $dlr_$$1) {
  const tmpPrevalAliasArgumentsAny$2 = arguments;
  $(`a`, $dlr_$$0, $dlr_$$1);
  const index$1 = $dlr_$$0 - 1;
  const arrval = arr[index$1];
  $(`b`, index$1);
  if (func.IS_EXPANDO_SET === undefined) {
    $(`c`);
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny$2;
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
