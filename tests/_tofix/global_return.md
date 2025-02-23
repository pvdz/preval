# Preval test case

# global_return.md

> Tofix > global return
>
>

the return type of CALLME is not safe to infer from an implicit global

## Input

`````js filename=intro
const a /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB /*:string*/ = tmpCalleeParam$5.charAt(0);
  const tmpRet$1 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const b /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB$1 /*:string*/ = tmpCalleeParam$1.charAt(0);
  const tmpRet /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const CALLME /*:(number)=>string*/ = function($$0) {
  const NEEDLE /*:primitive*/ = $$0;
  debugger;
  const out /*:primitive*/ = NEEDLE + b2;
  unknown = $coerce(out, `plustr`);
  $('if this updates unknown then whats the return type');
  return unknown; // we should not predict "string" here
};
const x = $(`co_rn`);
const tmpCalleeParam$1 /*:string*/ = $coerce(x, `string`);
const tmpSaooB$4 /*:number*/ = $frfr(b);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam /*:string*/ = CALLME(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 /*:string*/ = $coerce(y, `string`);
const tmpSaooB$2 /*:number*/ = $frfr(a);
tmpCalleeParam$5.charAt(1);
const tmpCalleeParam$3 /*:string*/ = CALLME(tmpSaooB$2);
$(tmpCalleeParam$3);
`````

## Pre Normal


`````js filename=intro
const a = function $free() {
  debugger;
  const tmpSaooB = tmpCalleeParam$5.charAt(0);
  const tmpRet$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const b = function $free() {
  debugger;
  const tmpSaooB$1 = tmpCalleeParam$1.charAt(0);
  const tmpRet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const CALLME = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const NEEDLE = $dlr_$$0;
  const out = NEEDLE + b2;
  unknown = $coerce(out, `plustr`);
  $(`if this updates unknown then whats the return type`);
  return unknown;
};
const x = $(`co_rn`);
const tmpCalleeParam$1 = $coerce(x, `string`);
const tmpSaooB$4 = $frfr(b);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam = CALLME(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 = $coerce(y, `string`);
const tmpSaooB$2 = $frfr(a);
tmpCalleeParam$5.charAt(1);
const tmpCalleeParam$3 = CALLME(tmpSaooB$2);
$(tmpCalleeParam$3);
`````

## Normalized


`````js filename=intro
const a = function $free() {
  debugger;
  const tmpSaooB = tmpCalleeParam$5.charAt(0);
  const tmpRet$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const b = function $free() {
  debugger;
  const tmpSaooB$1 = tmpCalleeParam$1.charAt(0);
  const tmpRet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const CALLME = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const NEEDLE = $dlr_$$0;
  const out = NEEDLE + b2;
  unknown = $coerce(out, `plustr`);
  $(`if this updates unknown then whats the return type`);
  return unknown;
};
const x = $(`co_rn`);
const tmpCalleeParam$1 = $coerce(x, `string`);
const tmpSaooB$4 = $frfr(b);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam = CALLME(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 = $coerce(y, `string`);
const tmpSaooB$2 = $frfr(a);
tmpCalleeParam$5.charAt(1);
const tmpCalleeParam$3 = CALLME(tmpSaooB$2);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const a /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB /*:string*/ = tmpCalleeParam$5.charAt(0);
  const tmpRet$1 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB);
  return tmpRet$1;
};
const b /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB$1 /*:string*/ = tmpCalleeParam$1.charAt(0);
  const tmpRet /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(tmpSaooB$1);
  return tmpRet;
};
const CALLME /*:(number)=>string*/ = function ($$0) {
  const $dlr_$$0 /*:number*/ = $$0;
  debugger;
  const out /*:primitive*/ = $dlr_$$0 + b2;
  unknown = $coerce(out, `plustr`);
  $(`if this updates unknown then whats the return type`);
  return unknown;
};
const x = $(`co_rn`);
const tmpCalleeParam$1 /*:string*/ = $coerce(x, `string`);
const tmpSaooB$4 /*:number*/ = $frfr(b);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam /*:string*/ = CALLME(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 /*:string*/ = $coerce(y, `string`);
const tmpSaooB$2 /*:number*/ = $frfr(a);
tmpCalleeParam$5.charAt(1);
const tmpCalleeParam$3 /*:string*/ = CALLME(tmpSaooB$2);
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
  $( "if this updates unknown then whats the return type" );
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
