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
let tmpExpando /*:primitive*/ = undefined;
const arr /*:array*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const func /*:(unknown, unused)=>unknown*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny$1 /*:arguments*/ = arguments;
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  let tmpssa3_tmpExpando$1 /*:unknown*/ = undefined;
  let tmpssa3_arg1 /*:unknown*/ = 3;
  const index /*:number*/ = $dlr_$$0 - 1;
  const arrval /*:primitive*/ = arr[index];
  const tmpBinLhs /*:unknown*/ = tmpExpando;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
  if (tmpIfTest) {
    tmpssa3_tmpExpando$1 = $spy;
    tmpssa3_arg1 = tmpPrevalAliasArgumentsAny$1;
    tmpExpando = true;
  } else {
  }
  const newIndex /*:number*/ = index + 100;
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
const func = function ($dlr_$$0, $$1) {
  const tmpPrevalAliasArgumentsAny$1 = arguments;
  let tmpssa3_tmpExpando$1 = undefined;
  let tmpssa3_arg1 = 3;
  const index = $dlr_$$0 - 1;
  const arrval = arr[index];
  if (tmpExpando === undefined) {
    tmpssa3_tmpExpando$1 = $spy;
    tmpssa3_arg1 = tmpPrevalAliasArgumentsAny$1;
    tmpExpando = true;
  }
  const newIndex = index + 100;
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
  const k = a;
  const l = k === undefined;
  if (l) {
    g = $spy;
    h = d;
    a = true;
  }
  const m = i + 100;
  const n = h[ m ];
  if (n) {
    return n;
  }
  else {
    const o = g.call( c, j );
    h[m] = o;
    return o;
  }
};
const p = c( 3, 4 );
const q = c( 1, 2 );
$( p, q );
`````


## Todos triggered


- inline computed array property read


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
