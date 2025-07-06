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
  unknown = $dlr_$$0 + b2 + ``;
  return unknown;
};
const tmpCalleeParam$1 = String($(`co_rn`));
$(f(tmpFree()));
const tmpCalleeParam$5 = String($(`m#az#e`));
$(f(tmpFree$1()));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free() {
  debugger;
  const b = $dotCall( $string_charAt, c, "charAt", 0 );
  const d = $dotCall( $string_indexOf, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", "indexOf", b );
  return d;
};
const e = function $free() {
  debugger;
  const f = $dotCall( $string_charAt, g, "charAt", 0 );
  const h = $dotCall( $string_indexOf, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", "indexOf", f );
  return h;
};
const i = function($$0 ) {
  const j = $$0;
  debugger;
  const k = j + b2;
  unknown = $coerce( k, "plustr" );
  return unknown;
};
const l = $( "co_rn" );
const g = $coerce( l, "string" );
const m = n( e );
const o = i( m );
$( o );
const p = $( "m#az#e" );
const c = $coerce( p, "string" );
const q = n( a );
const r = i( q );
$( r );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree$1 = function $free() {
  debugger;
  const tmpMCF = tmpCalleeParam$5.charAt;
  const tmpSaooB = $dotCall(tmpMCF, tmpCalleeParam$5, `charAt`, 0);
  const tmpMCF$1 = $string_indexOf;
  const tmpRet$1 = $dotCall($string_indexOf, `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`, `indexOf`, tmpSaooB);
  return tmpRet$1;
};
const tmpFree = function $free() {
  debugger;
  const tmpMCF$3 = tmpCalleeParam$1.charAt;
  const tmpSaooB$1 = $dotCall(tmpMCF$3, tmpCalleeParam$1, `charAt`, 0);
  const tmpMCF$5 = $string_indexOf;
  const tmpRet = $dotCall($string_indexOf, `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`, `indexOf`, tmpSaooB$1);
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
const tmpMCF$7 = tmpCalleeParam$1.charAt;
$dotCall(tmpMCF$7, tmpCalleeParam$1, `charAt`, 1);
const tmpCalleeParam = f(tmpSaooB$4);
$(tmpCalleeParam);
const y = $(`m#az#e`);
const tmpCalleeParam$5 = $coerce(y, `string`);
const tmpSaooB$2 = $frfr(tmpFree$1);
const tmpMCF$9 = tmpCalleeParam$5.charAt;
$dotCall(tmpMCF$9, tmpCalleeParam$5, `charAt`, 1);
const tmpCalleeParam$3 = f(tmpSaooB$2);
$(tmpCalleeParam$3);
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
