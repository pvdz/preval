# Preval test case

# charatindexof3.md

> Free > Charatindexof3
>
>

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


## Settled


`````js filename=intro
const tmpFree$1 /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB /*:string*/ = $dotCall($string_charAt, tmpCalleeParam$5, `charAt`, 0);
  const tmpRet$1 /*:number*/ = $dotCall(
    $string_indexOf,
    `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,
    `indexOf`,
    tmpSaooB,
  );
  return tmpRet$1;
};
const tmpFree /*:()=>number*/ = function $free() {
  debugger;
  const tmpSaooB$1 /*:string*/ = $dotCall($string_charAt, tmpCalleeParam$1, `charAt`, 0);
  const tmpRet /*:number*/ = $dotCall(
    $string_indexOf,
    `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,
    `indexOf`,
    tmpSaooB$1,
  );
  return tmpRet;
};
const f /*:(number)=>string*/ = function ($$0) {
  const $dlr_$$0 /*:number*/ = $$0;
  debugger;
  const out /*:primitive*/ = $dlr_$$0 + b2;
  unknown = $coerce(out, `plustr`);
  return unknown;
};
const x /*:unknown*/ = $(`co_rn`);
const tmpCalleeParam$1 /*:string*/ = $coerce(x, `string`);
const tmpSaooB$4 /*:number*/ = $frfr(tmpFree);
const tmpCalleeParam /*:string*/ = f(tmpSaooB$4);
$(tmpCalleeParam);
const y /*:unknown*/ = $(`m#az#e`);
const tmpCalleeParam$5 /*:string*/ = $coerce(y, `string`);
const tmpSaooB$2 /*:number*/ = $frfr(tmpFree$1);
const tmpCalleeParam$3 /*:string*/ = f(tmpSaooB$2);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free() {
  const tmpRet$1 = $dotCall(
    $string_indexOf,
    `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,
    `indexOf`,
    $dotCall($string_charAt, tmpCalleeParam$5, `charAt`, 0),
  );
  return tmpRet$1;
};
const tmpFree = function $free() {
  const tmpRet = $dotCall(
    $string_indexOf,
    `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,
    `indexOf`,
    $dotCall($string_charAt, tmpCalleeParam$1, `charAt`, 0),
  );
  return tmpRet;
};
const f = function ($dlr_$$0) {
  unknown = $coerce($dlr_$$0 + b2, `plustr`);
  return unknown;
};
const tmpCalleeParam$1 = $coerce($(`co_rn`), `string`);
$(f($frfr(tmpFree)));
const tmpCalleeParam$5 = $coerce($(`m#az#e`), `string`);
$(f($frfr(tmpFree$1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = $dotCall( $string_charAt, d, "charAt", 0 );
  const e = $dotCall( $string_indexOf, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", "indexOf", c );
  return e;
};
const f = function b() {
  debugger;
  const g = $dotCall( $string_charAt, h, "charAt", 0 );
  const i = $dotCall( $string_indexOf, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", "indexOf", g );
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
const p = j( n );
$( p );
const q = $( "m#az#e" );
const d = $coerce( q, "string" );
const r = o( a );
const s = j( r );
$( s );
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?


## Globals


BAD@! Found 2 implicit global bindings:

b2, unknown


## Runtime Outcome


Should call `$` with:
 - 1: 'co_rn'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
