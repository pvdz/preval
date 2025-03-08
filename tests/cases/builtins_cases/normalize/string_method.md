# Preval test case

# string_method.md

> Builtins cases > Normalize > String method
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
    const c2 = `dropme`.indexOf(c1); // This was left before
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

## Settled


`````js filename=intro
const tmpFree$1 /*:(string)=>string*/ = function $free($$0) {
  const repl$1 /*:string*/ = $$0;
  debugger;
  const a1 /*:string*/ = repl$1.charAt(0);
  const tmpRet /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(a1);
  const b1 /*:string*/ = repl$1.charAt(1);
  const b2 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(b1);
  const frout /*:number*/ = tmpRet + b2;
  const tmpRet$1 /*:string*/ = $coerce(frout, `string`);
  return tmpRet$1;
};
const f /*:(string)=>string*/ = function ($$0) {
  const inputstr /*:string*/ = $$0;
  debugger;
  const regex /*:regex*/ = /[^A-Za-z0-9\+\/\=]/g;
  const repl$2 /*:string*/ = inputstr.replace(regex, ``);
  const len /*:number*/ = repl$2.length;
  const test /*:boolean*/ = 0 < len;
  if (test) {
    const tmpClusterSSA_outputstr /*:string*/ = $frfr(tmpFree$1, repl$2);
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

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(repl$1) {
  const tmpRet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(repl$1.charAt(0));
  const tmpRet$1 = $coerce(
    tmpRet + `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(repl$1.charAt(1)),
    `string`,
  );
  return tmpRet$1;
};
const f = function (inputstr) {
  const repl$2 = inputstr.replace(/[^A-Za-z0-9\+\/\=]/g, ``);
  const len = repl$2.length;
  if (0 < len) {
    const tmpClusterSSA_outputstr = $frfr(tmpFree$1, repl$2);
    return tmpClusterSSA_outputstr;
  } else {
    return ``;
  }
};
$(f($coerce($(`co_rn`), `string`)));
$(f($coerce($(`m#az#e`), `string`)));
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
    const c2 = `dropme`.indexOf(c1);
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
    const c2 = `dropme`.indexOf(c1);
    const frout = a2 + b2;
    outputstr = $coerce(frout, `plustr`);
    return outputstr;
  } else {
    return outputstr;
  }
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
  const f = c.charAt( 1 );
  const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf( f );
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

## Runtime Outcome

Should call `$` with:
 - 1: 'co_rn'
 - 2: '68'
 - 3: 'm#az#e'
 - 4: '64'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
