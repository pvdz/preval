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
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpStringFirstArg = x;
const tmpCalleeParam$1 = $coerce(tmpStringFirstArg, `string`);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpStringFirstArg$1 = y;
const tmpCalleeParam$5 = $coerce(tmpStringFirstArg$1, `string`);
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5);
tmpCallCallee$3(tmpCalleeParam$3);
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
  const tmpOutlinedParam$1 /*:number*/ = $$0;
  debugger;
  const frout /*:primitive*/ = tmpOutlinedParam$1 + b2;
  outputstr = $coerce(frout, `plustr`);
  return outputstr;
};
const x /*:unknown*/ = $(`co_rn`);
const tmpCalleeParam$1 /*:string*/ = $coerce(x, `string`);
const tmpSaooB$4 /*:number*/ = $frfr(tmpFree);
tmpCalleeParam$1.charAt(1);
const tmpCalleeParam /*:string*/ = f(tmpSaooB$4);
$(tmpCalleeParam);
const y /*:unknown*/ = $(`m#az#e`);
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
  outputstr = $coerce( l, "plustr" );
  return outputstr;
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

b2, outputstr

## Result

Should call `$` with:
 - 1: 'co_rn'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
