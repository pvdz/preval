# Preval test case

# primitive_param_regression.md

> Tofix > primitive param regression
>
>

Why is the param to f getting primitive when it's only a number?

(This is a test case)

## Input

`````js filename=intro
const tmpFree$1 /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB /*:string*/ = tmpCalleeParam$5.charAt(0);
  const tmpRet$1 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const tmpFree /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB$1 /*:string*/ = tmpCalleeParam$1.charAt(0);
  const tmpRet /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const f /*:(number)=>string*/ = function ($$0) {
  const targetparam /*:primitive*/ = $$0;
  debugger;
  const out /*:primitive*/ = targetparam + b2;
  unknown = $coerce(out, `plustr`);
  return unknown;
};
const x = $(`co_rn`);
const tmpCalleeParam$1 /*:string*/ = $coerce(x, `string`);
const tmpSaooB$4 /*:number*/ = $frfr(tmpFree);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam /*:string*/ = f(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 /*:string*/ = $coerce(y, `string`);
const tmpSaooB$2 /*:number*/ = $frfr(tmpFree$1);
tmpCalleeParam$5.charAt(1);
const tmpCalleeParam$3 /*:string*/ = f(tmpSaooB$2);
$(tmpCalleeParam$3);
`````

## Pre Normal


`````js filename=intro
const tmpFree$1 = function $free() {
  debugger;
  const tmpSaooB = tmpCalleeParam$5.charAt(0);
  const tmpRet$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const tmpFree = function $free() {
  debugger;
  const tmpSaooB$1 = tmpCalleeParam$1.charAt(0);
  const tmpRet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const f = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const targetparam = $dlr_$$0;
  const out = targetparam + b2;
  unknown = $coerce(out, `plustr`);
  return unknown;
};
const x = $(`co_rn`);
const tmpCalleeParam$1 = $coerce(x, `string`);
const tmpSaooB$4 = $frfr(tmpFree);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam = f(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 = $coerce(y, `string`);
const tmpSaooB$2 = $frfr(tmpFree$1);
tmpCalleeParam$5.charAt(1);
const tmpCalleeParam$3 = f(tmpSaooB$2);
$(tmpCalleeParam$3);
`````

## Normalized


`````js filename=intro
const tmpFree$1 = function $free() {
  debugger;
  const tmpSaooB = tmpCalleeParam$5.charAt(0);
  const tmpRet$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const tmpFree = function $free() {
  debugger;
  const tmpSaooB$1 = tmpCalleeParam$1.charAt(0);
  const tmpRet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const f = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const targetparam = $dlr_$$0;
  const out = targetparam + b2;
  unknown = $coerce(out, `plustr`);
  return unknown;
};
const x = $(`co_rn`);
const tmpCalleeParam$1 = $coerce(x, `string`);
const tmpSaooB$4 = $frfr(tmpFree);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam = f(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 = $coerce(y, `string`);
const tmpSaooB$2 = $frfr(tmpFree$1);
tmpCalleeParam$5.charAt(1);
const tmpCalleeParam$3 = f(tmpSaooB$2);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpFree$1 /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB /*:string*/ = tmpCalleeParam$5.charAt(0);
  const tmpRet$1 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const tmpFree /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB$1 /*:string*/ = tmpCalleeParam$1.charAt(0);
  const tmpRet /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const f /*:(number)=>string*/ = function ($$0) {
  const $dlr_$$0 /*:number*/ = $$0;
  debugger;
  const out /*:primitive*/ = $dlr_$$0 + b2;
  unknown = $coerce(out, `plustr`);
  return unknown;
};
const x = $(`co_rn`);
const tmpCalleeParam$1 /*:string*/ = $coerce(x, `string`);
const tmpSaooB$4 /*:number*/ = $frfr(tmpFree);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam /*:string*/ = f(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 /*:string*/ = $coerce(y, `string`);
const tmpSaooB$2 /*:number*/ = $frfr(tmpFree$1);
tmpCalleeParam$5.charAt(1);
const tmpCalleeParam$3 /*:string*/ = f(tmpSaooB$2);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d.charAt( 0 );
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf( c );
  return e;
};
const f = function b() {
  debugger;
  const g = h.charAt( 0 );
  const i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf( g );
  return i;
};
const j = function($$0 ) {
  const k = $$0;
  debugger;
  const l = k + b2;
  unknown = $coerce( l, "plustr" );
  return unknown;
};
const m = $( "co_rn" );
const h = $coerce( m, "string" );
const n = o( f );
h.charAt( 1 );
const p = j( n );
$( p );
const q = $( "m#az#e" );
const d = $coerce( q, "string" );
const r = o( a );
d.charAt( 1 );
const s = j( r );
$( s );
`````

## Globals

BAD@! Found 2 implicit global bindings:

b2, unknown

## Result

Should call `$` with:
 - 1: 'co_rn'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
