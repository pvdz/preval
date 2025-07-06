# Preval test case

# simplify_call.md

> Free > Simplify call
>
> There was a problem where a $frfr that would be simplified
> would get its first arg aliased, which would trigger an assertion
> error that asserts that the first arg to $frfr always be a $free ref
> This is a test artifact more than anything else because it would
> only appear when the input code contained a $frfr with complex arg.

## Input

`````js filename=intro
const tmpFree$21 = function $free(tmpUnaryArg$489) {
  const tmpBinLhs$139/*:number*/ = -tmpUnaryArg$489;
  const tmpBinLhs$141/*:number*/ = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b/*:array*/ = ['a', 'b'];
const _0xcb1177/*:unknown*/ = $;
try {
  if ($frfr(tmpFree$21, parseInt(_0xcb1177(824)))) {
  } else {
    _0xb34c4b.push(_0xb34c4b.shift());
  }
} catch (_0xa7aced$11) {
  _0xb34c4b.push(_0xb34c4b.shift());
}
$('thend');
`````


## Settled


`````js filename=intro
const tmpFree$21 /*:(number)=>number*/ = function $free($$0) {
  const tmpUnaryArg$489 /*:number*/ = $$0;
  debugger;
  const tmpBinLhs$139 /*:number*/ = -tmpUnaryArg$489;
  const tmpBinLhs$141 /*:number*/ = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b /*:array*/ /*truthy*/ = [`a`, `b`];
try {
  const tmpCalleeParam$3 /*:unknown*/ = $(824);
  const tmpCalleeParam$1 /*:number*/ = $Number_parseInt(tmpCalleeParam$3);
  const tmpIfTest /*:number*/ = $frfr(tmpFree$21, tmpCalleeParam$1);
  if (tmpIfTest) {
  } else {
    const tmpMCP /*:primitive*/ /*truthy*/ = $dotCall($array_shift, _0xb34c4b, `shift`);
    $dotCall($array_push, _0xb34c4b, `push`, tmpMCP);
  }
} catch (_0xa7aced$11) {
  const tmpMCP$1 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, _0xb34c4b, `shift`);
  $dotCall($array_push, _0xb34c4b, `push`, tmpMCP$1);
}
$(`thend`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$21 = function $free(tmpUnaryArg$489) {
  const tmpBinLhs$139 = -tmpUnaryArg$489;
  const tmpBinLhs$141 = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b = [`a`, `b`];
try {
  if (!tmpFree$21($Number_parseInt($(824)))) {
    $dotCall($array_push, _0xb34c4b, `push`, $dotCall($array_shift, _0xb34c4b, `shift`));
  }
} catch (_0xa7aced$11) {
  $dotCall($array_push, _0xb34c4b, `push`, $dotCall($array_shift, _0xb34c4b, `shift`));
}
$(`thend`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0 ) {
  const b = $$0;
  debugger;
  const c = -b;
  const d = -c;
  return d;
};
const e = [ "a", "b" ];
try {
  const f = $( 824 );
  const g = $Number_parseInt( f );
  const h = i( a, g );
  if (h) {

  }
  else {
    const j = $dotCall( $array_shift, e, "shift" );
    $dotCall( $array_push, e, "push", j );
  }
}
catch (k) {
  const l = $dotCall( $array_shift, e, "shift" );
  $dotCall( $array_push, e, "push", l );
}
$( "thend" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree$21 = function $free($$0) {
  let tmpUnaryArg$489 = $$0;
  debugger;
  const tmpBinLhs$139 = -tmpUnaryArg$489;
  const tmpBinLhs$141 = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b = [`a`, `b`];
const _0xcb1177 = $;
try {
  let tmpCalleeParam = tmpFree$21;
  let tmpCalleeParam$3 = _0xcb1177(824);
  let tmpCalleeParam$1 = $Number_parseInt(tmpCalleeParam$3);
  const tmpIfTest = $frfr(tmpFree$21, tmpCalleeParam$1);
  if (tmpIfTest) {
  } else {
    const tmpMCF = _0xb34c4b.push;
    const tmpMCF$1 = _0xb34c4b.shift;
    const tmpMCP = $dotCall(tmpMCF$1, _0xb34c4b, `shift`);
    $dotCall(tmpMCF, _0xb34c4b, `push`, tmpMCP);
  }
} catch (_0xa7aced$11) {
  const tmpMCF$3 = _0xb34c4b.push;
  const tmpMCF$5 = _0xb34c4b.shift;
  const tmpMCP$1 = $dotCall(tmpMCF$5, _0xb34c4b, `shift`);
  $dotCall(tmpMCF$3, _0xb34c4b, `push`, tmpMCP$1);
}
$(`thend`);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 824
 - 2: 'thend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
