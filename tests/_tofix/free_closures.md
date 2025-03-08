# Preval test case

# free_closures.md

> Tofix > free closures
>
>

This generates a free with closure access :(

(existing test case))

## Input

`````js filename=intro
const f = function(repl) {
  const a1 = repl.charAt(0);
  const a2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(a1);
  const b1 = repl.charAt(1);
  const frout = a2 + b2;
  outputstr = $coerce(frout, `plustr`);
  return outputstr;
}
const x = $('co_rn');
$(f(String(x)));
const y = $('m#az#e');
$(f(String(y)));
`````

## Settled


`````js filename=intro
const tmpFree$1 /*:(string)=>number*/ = function $free($$0) {
  const tmpCalleeParam$2 /*:string*/ = $$0;
  debugger;
  const tmpSaooB /*:string*/ = tmpCalleeParam$2.charAt(0);
  const tmpRet$1 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const tmpFree /*:(string)=>number*/ = function $free($$0) {
  const tmpCalleeParam$4 /*:string*/ = $$0;
  debugger;
  const tmpSaooB$1 /*:string*/ = tmpCalleeParam$4.charAt(0);
  const tmpRet /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const f /*:(number)=>string*/ = function ($$0) {
  const tmpOutlinedParam$1 /*:number*/ = $$0;
  debugger;
  const frout /*:primitive*/ = tmpOutlinedParam$1 + b2;
  outputstr = $coerce(frout, `plustr`);
  return outputstr;
};
const x /*:unknown*/ = $(`co_rn`);
const tmpCalleeParam$1 /*:string*/ = $coerce(x, `string`);
const tmpSaooB$4 /*:number*/ = $frfr(tmpFree, tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = f(tmpSaooB$4);
$(tmpCalleeParam);
const y /*:unknown*/ = $(`m#az#e`);
const tmpCalleeParam$5 /*:string*/ = $coerce(y, `string`);
const tmpSaooB$2 /*:number*/ = $frfr(tmpFree$1, tmpCalleeParam$5);
const tmpCalleeParam$3 /*:string*/ = f(tmpSaooB$2);
$(tmpCalleeParam$3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(tmpCalleeParam$2) {
  const tmpRet$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpCalleeParam$2.charAt(0));
  return tmpRet$1;
};
const tmpFree = function $free(tmpCalleeParam$4) {
  const tmpRet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpCalleeParam$4.charAt(0));
  return tmpRet;
};
const f = function (tmpOutlinedParam$1) {
  outputstr = $coerce(tmpOutlinedParam$1 + b2, `plustr`);
  return outputstr;
};
$(f($frfr(tmpFree, $coerce($(`co_rn`), `string`))));
$(f($frfr(tmpFree$1, $coerce($(`m#az#e`), `string`))));
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let repl = $$0;
  debugger;
  const a1 = repl.charAt(0);
  const a2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(a1);
  const b1 = repl.charAt(1);
  const frout = a2 + b2;
  outputstr = $coerce(frout, `plustr`);
  return outputstr;
};
const x = $(`co_rn`);
$(f(String(x)));
const y = $(`m#az#e`);
$(f(String(y)));
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let repl = $$0;
  debugger;
  const a1 = repl.charAt(0);
  const a2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(a1);
  const b1 = repl.charAt(1);
  const frout = a2 + b2;
  outputstr = $coerce(frout, `plustr`);
  return outputstr;
};
const x = $(`co_rn`);
const tmpCallCallee = f;
const tmpStringFirstArg = x;
const tmpCalleeParam$1 = $coerce(x, `string`);
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCallCallee$1 = f;
const tmpStringFirstArg$1 = y;
const tmpCalleeParam$5 = $coerce(y, `string`);
const tmpCalleeParam$3 = tmpCallCallee$1(tmpCalleeParam$5);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c.charAt( 0 );
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf( d );
  return e;
};
const f = function b($$0 ) {
  const g = $$0;
  debugger;
  const h = g.charAt( 0 );
  const i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf( h );
  return i;
};
const j = function($$0 ) {
  const k = $$0;
  debugger;
  const l = k + b2;
  outputstr = $coerce( l, "plustr" );
  return outputstr;
};
const m = $( "co_rn" );
const n = $coerce( m, "string" );
const o = p( f, n );
const q = j( o );
$( q );
const r = $( "m#az#e" );
const s = $coerce( r, "string" );
const t = p( a, s );
const u = j( t );
$( u );
`````

## Globals

BAD@! Found 2 implicit global bindings:

b2, outputstr

## Runtime Outcome

Should call `$` with:
 - 1: 'co_rn'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
