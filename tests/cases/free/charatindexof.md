# Preval test case

# charatindexof.md

> Free > Charatindexof
>
>

## Input

`````js filename=intro
const f = function(inputstr) {
  let outputstr = ``;
  const regex = /[^A-Za-z0-9\+\/\=]/g;
  const repl = inputstr.replace(regex, ``);
  const len = repl.length;
  const test = 0 < len;
  if (test) {
    const a1 = repl.charAt(0);
    const a2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(a1);
    const b1 = repl.charAt(1);
    const b2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(b1);
    const c1 = repl.charAt(2);
    const c2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(c1);
    const d1 = repl.charAt(3);
    const d2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(d1);
    const frout = a2 + b2;
    outputstr = $coerce(frout, `plustr`);
  }
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
  let inputstr = $$0;
  debugger;
  let outputstr = ``;
  const regex = /[^A-Za-z0-9\+\/\=]/g;
  const repl = inputstr.replace(regex, ``);
  const len = repl.length;
  const test = 0 < len;
  if (test) {
    const a1 = repl.charAt(0);
    const a2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(a1);
    const b1 = repl.charAt(1);
    const b2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(b1);
    const c1 = repl.charAt(2);
    const c2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(c1);
    const d1 = repl.charAt(3);
    const d2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(d1);
    const frout = a2 + b2;
    outputstr = $coerce(frout, `plustr`);
  }
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
  let inputstr = $$0;
  debugger;
  let outputstr = ``;
  const regex = /[^A-Za-z0-9\+\/\=]/g;
  const repl = inputstr.replace(regex, ``);
  const len = repl.length;
  const test = 0 < len;
  if (test) {
    const a1 = repl.charAt(0);
    const a2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(a1);
    const b1 = repl.charAt(1);
    const b2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(b1);
    const c1 = repl.charAt(2);
    const c2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(c1);
    const d1 = repl.charAt(3);
    const d2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(d1);
    const frout = a2 + b2;
    outputstr = $coerce(frout, `plustr`);
    return outputstr;
  } else {
    return outputstr;
  }
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
const tmpFree /*:(string)=>string*/ = function $free($$0) {
  const repl /*:string*/ = $$0;
  debugger;
  const a1 /*:string*/ = repl.charAt(0);
  const a2 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(a1);
  const b1 /*:string*/ = repl.charAt(1);
  const b2 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(b1);
  repl.charAt(2);
  repl.charAt(3);
  const frout /*:number*/ = a2 + b2;
  const tmpRet /*:string*/ = $coerce(frout, `string`);
  return tmpRet;
};
const f /*:(string)=>string*/ = function ($$0) {
  const inputstr /*:string*/ = $$0;
  debugger;
  const regex /*:regex*/ = /[^A-Za-z0-9\+\/\=]/g;
  const repl$1 /*:string*/ = inputstr.replace(regex, ``);
  const len /*:number*/ = repl$1.length;
  const test /*:boolean*/ = 0 < len;
  if (test) {
    const tmpClusterSSA_outputstr /*:string*/ = $frfr(tmpFree, repl$1);
    return tmpClusterSSA_outputstr;
  } else {
    return ``;
  }
};
const x /*:unknown*/ = $(`co_rn`);
const tmpCalleeParam$1 /*:string*/ = $coerce(x, `string`);
const tmpCalleeParam /*:string*/ = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const y /*:unknown*/ = $(`m#az#e`);
const tmpCalleeParam$5 /*:string*/ = $coerce(y, `string`);
const tmpCalleeParam$3 /*:string*/ = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c.charAt( 0 );
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf( d );
  const f = c.charAt( 1 );
  const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf( f );
  c.charAt( 2 );
  c.charAt( 3 );
  const h = e + g;
  const i = $coerce( h, "string" );
  return i;
};
const j = function($$0 ) {
  const k = $$0;
  debugger;
  const l = /[^A-Za-z0-9\+\/\=]/g;
  const m = k.replace( l, "" );
  const n = m.length;
  const o = 0 < n;
  if (o) {
    const p = q( a, m );
    return p;
  }
  else {
    return "";
  }
};
const r = $( "co_rn" );
const s = $coerce( r, "string" );
const t = j( s );
$( t );
const u = $( "m#az#e" );
const v = $coerce( u, "string" );
const w = j( v );
$( w );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'co_rn'
 - 2: '68'
 - 3: 'm#az#e'
 - 4: '64'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
