# Preval test case

# charatindexof2.md

> Free > Charatindexof2
>
>

This generates a free with closure access :(

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
const tmpFree /*:(string)=>number*/ = function $free($$0) {
  const repl /*:string*/ = $$0;
  debugger;
  const a1 /*:string*/ = $dotCall($string_charAt, repl, `charAt`, 0);
  const tmpRet /*:number*/ = $dotCall($string_indexOf, `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`, `indexOf`, a1);
  return tmpRet;
};
const f /*:(string)=>string*/ = function ($$0) {
  const repl$1 /*:string*/ = $$0;
  debugger;
  const a2 /*:number*/ = $frfr(tmpFree, repl$1);
  const frout /*:primitive*/ = a2 + b2;
  outputstr = $coerce(frout, `plustr`);
  return outputstr;
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
const tmpFree = function $free(repl) {
  const tmpRet = $dotCall(
    $string_indexOf,
    `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,
    `indexOf`,
    $dotCall($string_charAt, repl, `charAt`, 0),
  );
  return tmpRet;
};
const f = function (repl$1) {
  outputstr = $coerce($frfr(tmpFree, repl$1) + b2, `plustr`);
  return outputstr;
};
$(f($coerce($(`co_rn`), `string`)));
$(f($coerce($(`m#az#e`), `string`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $dotCall( $string_charAt, c, "charAt", 0 );
  const e = $dotCall( $string_indexOf, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", "indexOf", d );
  return e;
};
const f = function($$0 ) {
  const g = $$0;
  debugger;
  const h = i( a, g );
  const j = h + b2;
  outputstr = $coerce( j, "plustr" );
  return outputstr;
};
const k = $( "co_rn" );
const l = $coerce( k, "string" );
const m = f( l );
$( m );
const n = $( "m#az#e" );
const o = $coerce( n, "string" );
const p = f( o );
$( p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let repl = $$0;
  debugger;
  const tmpMCF = repl.charAt;
  const a1 = $dotCall(tmpMCF, repl, `charAt`, 0);
  const tmpMCF$1 = $string_indexOf;
  const a2 = $dotCall($string_indexOf, `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`, `indexOf`, a1);
  const tmpMCF$3 = repl.charAt;
  const b1 = $dotCall(tmpMCF$3, repl, `charAt`, 1);
  const frout = a2 + b2;
  outputstr = $coerce(frout, `plustr`);
  return outputstr;
};
const x = $(`co_rn`);
const tmpCallCallee = f;
const tmpStringFirstArg = x;
let tmpCalleeParam$1 = $coerce(x, `string`);
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCallCallee$1 = f;
const tmpStringFirstArg$1 = y;
let tmpCalleeParam$5 = $coerce(y, `string`);
let tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
`````


## Todos triggered


None


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
