# Preval test case

# expando_stuff.md

> Tofix > expando stuff

## Input

`````js filename=intro
const arr = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];
let arg1 = 3;
let arg2 = 4;
let func = function($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const newArg1 = $$0;
  debugger;
  const index = newArg1 - 1;
  const arrval = arr[index];
  const tmpBinLhs = func.IS_EXPANDO_SET;
  const tmpIfTest = tmpBinLhs === undefined;
  if (tmpIfTest) {
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny;
    func.IS_EXPANDO_SET = true;
  } else {}
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
const a = func(3, 4);
const b = func(1, 2);
$(a, b);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 /*:unknown*/ = 3;
const func /*:(unknown, unused)=>unknown*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny$1 /*:arguments*/ = arguments;
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  const index /*:number*/ = $dlr_$$0 - 1;
  const arrval /*:primitive*/ = arr[index];
  const tmpBinLhs /*:unknown*/ = func.IS_EXPANDO_SET;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
  if (tmpIfTest) {
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny$1;
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
const func = function ($dlr_$$0, $$1) {
  const tmpPrevalAliasArgumentsAny$1 = arguments;
  const index = $dlr_$$0 - 1;
  const arrval = arr[index];
  if (func.IS_EXPANDO_SET === undefined) {
    func.THIS_IS_AN_EXPANDO = $spy;
    arg1 = tmpPrevalAliasArgumentsAny$1;
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
